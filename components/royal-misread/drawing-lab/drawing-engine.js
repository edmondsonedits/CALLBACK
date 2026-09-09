(function (global) {
  'use strict';

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  class RoyalDrawingEngine {
    constructor(canvas, options = {}) {
      if (!(canvas instanceof HTMLCanvasElement)) throw new Error('RoyalDrawingEngine requires a canvas element.');

      this.canvas = canvas;
      this.options = {
        logicalSize: 1024,
        maxDevicePixelRatio: 3,
        color: '#171923',
        width: 12,
        tool: 'pen',
        touchSmoothing: 0.72,
        penSmoothing: 0.9,
        mouseSmoothing: 0.82,
        minPointDistance: 0.00065,
        onChange: null,
        ...options,
      };

      this.actions = [];
      this.redoActions = [];
      this.activePointerId = null;
      this.activeStroke = null;
      this.destroyed = false;
      this.cssWidth = 1;
      this.cssHeight = 1;
      this.dpr = 1;
      this.raf = 0;

      // The committed bitmap lets us redraw only the active stroke during pointermove.
      // Undo/redo/load/resize rebuild this cache from the normalized action history.
      this.committedCanvas = document.createElement('canvas');

      this.canvas.style.touchAction = 'none';
      this.canvas.style.userSelect = 'none';
      this.canvas.style.webkitUserSelect = 'none';

      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._resize = this._resize.bind(this);
      this._preventContextMenu = (event) => event.preventDefault();

      canvas.addEventListener('pointerdown', this._onPointerDown);
      canvas.addEventListener('pointermove', this._onPointerMove);
      canvas.addEventListener('pointerup', this._onPointerUp);
      canvas.addEventListener('pointercancel', this._onPointerUp);
      canvas.addEventListener('contextmenu', this._preventContextMenu);

      if ('ResizeObserver' in global) {
        this.resizeObserver = new ResizeObserver(this._resize);
        this.resizeObserver.observe(canvas);
      } else {
        global.addEventListener('resize', this._resize);
      }

      this._resize();
    }

    setTool(tool) {
      if (!['pen', 'eraser'].includes(tool)) return;
      this.options.tool = tool;
    }

    setColor(color) {
      if (typeof color !== 'string' || !color) return;
      this.options.color = color;
      this.options.tool = 'pen';
    }

    setWidth(width) {
      const parsed = Number(width);
      if (!Number.isFinite(parsed)) return;
      this.options.width = clamp(parsed, 2, 80);
    }

    undo() {
      if (!this.actions.length || this.activeStroke) return false;
      this.redoActions.push(this.actions.pop());
      this._rebuildCommittedCache();
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    redo() {
      if (!this.redoActions.length || this.activeStroke) return false;
      this.actions.push(this.redoActions.pop());
      this._rebuildCommittedCache();
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    clear() {
      if (this.activeStroke || this.isVisuallyEmpty()) return false;
      const action = { type: 'clear' };
      this.actions.push(action);
      this.redoActions = [];
      this._commitActionToCache(action);
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    reset() {
      this.actions = [];
      this.redoActions = [];
      this.activeStroke = null;
      this.activePointerId = null;
      this._rebuildCommittedCache();
      this._scheduleRender();
      this._emitChange();
    }

    canUndo() {
      return this.actions.length > 0 && !this.activeStroke;
    }

    canRedo() {
      return this.redoActions.length > 0 && !this.activeStroke;
    }

    isVisuallyEmpty() {
      const lastClear = this.actions.reduce((index, action, i) => action.type === 'clear' ? i : index, -1);
      return !this.actions.slice(lastClear + 1).some((action) => action.type === 'stroke' && action.tool === 'pen');
    }

    serialize() {
      return {
        version: 2,
        logicalSize: this.options.logicalSize,
        actions: JSON.parse(JSON.stringify(this.actions)),
      };
    }

    load(payload) {
      if (!payload || ![1, 2].includes(payload.version) || !Array.isArray(payload.actions)) {
        throw new Error('Unsupported drawing payload.');
      }

      this.actions = payload.actions.map((action) => this._sanitizeAction(action)).filter(Boolean);
      this.redoActions = [];
      this.activeStroke = null;
      this.activePointerId = null;
      this._rebuildCommittedCache();
      this._scheduleRender();
      this._emitChange();
    }

    exportCanvas(size = this.options.logicalSize, background = '#ffffff') {
      const outputSize = clamp(Math.round(Number(size) || this.options.logicalSize), 256, 2048);
      const layer = document.createElement('canvas');
      layer.width = outputSize;
      layer.height = outputSize;
      const layerContext = layer.getContext('2d', { alpha: true });
      this._renderActions(layerContext, outputSize, outputSize, this.actions);

      const output = document.createElement('canvas');
      output.width = outputSize;
      output.height = outputSize;
      const context = output.getContext('2d', { alpha: false });
      context.fillStyle = background;
      context.fillRect(0, 0, outputSize, outputSize);
      context.drawImage(layer, 0, 0);
      return output;
    }

    exportDataURL(size = this.options.logicalSize, type = 'image/png', quality = 0.92) {
      return this.exportCanvas(size).toDataURL(type, quality);
    }

    exportBlob(size = this.options.logicalSize, type = 'image/png', quality = 0.92) {
      const output = this.exportCanvas(size);
      return new Promise((resolve, reject) => {
        output.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Drawing export failed.')), type, quality);
      });
    }

    destroy() {
      if (this.destroyed) return;
      this.destroyed = true;
      cancelAnimationFrame(this.raf);
      this.canvas.removeEventListener('pointerdown', this._onPointerDown);
      this.canvas.removeEventListener('pointermove', this._onPointerMove);
      this.canvas.removeEventListener('pointerup', this._onPointerUp);
      this.canvas.removeEventListener('pointercancel', this._onPointerUp);
      this.canvas.removeEventListener('contextmenu', this._preventContextMenu);
      this.resizeObserver?.disconnect();
      if (!this.resizeObserver) global.removeEventListener('resize', this._resize);
    }

    _sanitizeAction(action) {
      if (!action || typeof action !== 'object') return null;
      if (action.type === 'clear') return { type: 'clear' };
      if (action.type !== 'stroke' || !['pen', 'eraser'].includes(action.tool) || !Array.isArray(action.points)) return null;

      const points = action.points.slice(0, 12000).map((point) => ({
        x: clamp(Number(point?.x) || 0, 0, 1),
        y: clamp(Number(point?.y) || 0, 0, 1),
        pressure: clamp(Number(point?.pressure) || 0.5, 0, 1),
      }));
      if (!points.length) return null;

      return {
        type: 'stroke',
        tool: action.tool,
        color: typeof action.color === 'string' ? action.color : '#171923',
        width: clamp(Number(action.width) || 12, 2, 100),
        pointerType: ['touch', 'pen', 'mouse'].includes(action.pointerType) ? action.pointerType : 'unknown',
        points,
      };
    }

    _resize() {
      if (this.destroyed) return;
      const rect = this.canvas.getBoundingClientRect();
      this.cssWidth = Math.max(1, rect.width);
      this.cssHeight = Math.max(1, rect.height);
      this.dpr = clamp(global.devicePixelRatio || 1, 1, this.options.maxDevicePixelRatio);
      const nextWidth = Math.max(1, Math.round(this.cssWidth * this.dpr));
      const nextHeight = Math.max(1, Math.round(this.cssHeight * this.dpr));
      let changed = false;
      if (this.canvas.width !== nextWidth || this.canvas.height !== nextHeight) {
        this.canvas.width = nextWidth;
        this.canvas.height = nextHeight;
        changed = true;
      }
      if (this.committedCanvas.width !== nextWidth || this.committedCanvas.height !== nextHeight) {
        this.committedCanvas.width = nextWidth;
        this.committedCanvas.height = nextHeight;
        changed = true;
      }
      if (changed) this._rebuildCommittedCache();
      this._scheduleRender();
    }

    _eventPoint(event) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1),
        y: clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1),
        pressure: event.pointerType === 'pen' ? clamp(event.pressure || 0.5, 0.15, 1) : 0.5,
      };
    }

    _smoothingFor(pointerType) {
      if (pointerType === 'pen') return this.options.penSmoothing;
      if (pointerType === 'mouse') return this.options.mouseSmoothing;
      return this.options.touchSmoothing;
    }

    _appendEventPoint(event) {
      if (!this.activeStroke) return;
      const raw = this._eventPoint(event);
      const points = this.activeStroke.points;
      const previous = points[points.length - 1];
      if (!previous) {
        points.push(raw);
        return;
      }

      const follow = clamp(this._smoothingFor(event.pointerType), 0.45, 1);
      const point = {
        x: previous.x + (raw.x - previous.x) * follow,
        y: previous.y + (raw.y - previous.y) * follow,
        pressure: previous.pressure + (raw.pressure - previous.pressure) * follow,
      };
      const dx = point.x - previous.x;
      const dy = point.y - previous.y;
      const threshold = this.options.minPointDistance * this.options.minPointDistance;
      if ((dx * dx + dy * dy) >= threshold) points.push(point);
    }

    _onPointerDown(event) {
      if (this.activePointerId !== null) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.isPrimary === false) return;
      event.preventDefault();

      this.activePointerId = event.pointerId;
      this.canvas.setPointerCapture?.(event.pointerId);
      const tool = this.options.tool;
      this.activeStroke = {
        type: 'stroke',
        tool,
        color: this.options.color,
        width: tool === 'eraser' ? Math.max(this.options.width * 2.6, 32) : this.options.width,
        pointerType: event.pointerType || 'unknown',
        points: [this._eventPoint(event)],
      };
      this.redoActions = [];
      this._scheduleRender();
    }

    _onPointerMove(event) {
      if (event.pointerId !== this.activePointerId || !this.activeStroke) return;
      event.preventDefault();

      let events = [event];
      if (typeof event.getCoalescedEvents === 'function') {
        const coalesced = event.getCoalescedEvents();
        if (coalesced && coalesced.length) events = coalesced;
      }

      for (const sourceEvent of events) this._appendEventPoint(sourceEvent);
      this._scheduleRender();
    }

    _onPointerUp(event) {
      if (event.pointerId !== this.activePointerId) return;
      event.preventDefault();

      if (this.activeStroke && event.type === 'pointerup') this._appendEventPoint(event);
      const completedStroke = this.activeStroke;

      try { this.canvas.releasePointerCapture?.(event.pointerId); } catch (_) {}
      this.activePointerId = null;
      this.activeStroke = null;

      if (completedStroke?.points?.length) {
        this.actions.push(completedStroke);
        this._commitActionToCache(completedStroke);
      }
      this._scheduleRender();
      this._emitChange();
    }

    _scheduleRender() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this._renderVisible());
    }

    _renderVisible() {
      const context = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.drawImage(this.committedCanvas, 0, 0);

      if (this.activeStroke) {
        context.save();
        context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this._renderActions(context, this.cssWidth, this.cssHeight, [this.activeStroke]);
        context.restore();
      }
    }

    _rebuildCommittedCache() {
      const context = this.committedCanvas.getContext('2d', { alpha: true });
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, this.committedCanvas.width, this.committedCanvas.height);
      context.save();
      context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this._renderActions(context, this.cssWidth, this.cssHeight, this.actions);
      context.restore();
    }

    _commitActionToCache(action) {
      const context = this.committedCanvas.getContext('2d', { alpha: true });
      context.save();
      context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this._renderActions(context, this.cssWidth, this.cssHeight, [action]);
      context.restore();
    }

    _renderActions(context, width, height, actions) {
      const scale = Math.min(width, height) / this.options.logicalSize;
      context.save();
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (const action of actions) {
        if (action.type === 'clear') {
          context.save();
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.restore();
          continue;
        }
        if (action.type !== 'stroke' || !action.points.length) continue;

        const points = action.points;
        context.globalCompositeOperation = action.tool === 'eraser' ? 'destination-out' : 'source-over';
        context.strokeStyle = action.color || '#171923';
        context.fillStyle = action.color || '#171923';
        context.lineWidth = Math.max(1, action.width * scale);

        const px = (point) => ({ x: point.x * width, y: point.y * height });
        const first = px(points[0]);
        if (points.length === 1) {
          context.beginPath();
          context.arc(first.x, first.y, context.lineWidth / 2, 0, Math.PI * 2);
          context.fill();
          continue;
        }

        context.beginPath();
        context.moveTo(first.x, first.y);
        for (let i = 1; i < points.length - 1; i += 1) {
          const current = px(points[i]);
          const next = px(points[i + 1]);
          context.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
        }
        const last = px(points[points.length - 1]);
        context.lineTo(last.x, last.y);
        context.stroke();
      }
      context.restore();
    }

    _emitChange() {
      if (typeof this.options.onChange === 'function') {
        this.options.onChange({
          canUndo: this.canUndo(),
          canRedo: this.canRedo(),
          isEmpty: this.isVisuallyEmpty(),
          actionCount: this.actions.length,
        });
      }
    }
  }

  global.RoyalDrawingEngine = RoyalDrawingEngine;
})(window);
