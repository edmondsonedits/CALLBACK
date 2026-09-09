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

      this.canvas.style.touchAction = 'none';
      this.canvas.style.userSelect = 'none';
      this.canvas.style.webkitUserSelect = 'none';

      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._resize = this._resize.bind(this);

      canvas.addEventListener('pointerdown', this._onPointerDown);
      canvas.addEventListener('pointermove', this._onPointerMove);
      canvas.addEventListener('pointerup', this._onPointerUp);
      canvas.addEventListener('pointercancel', this._onPointerUp);
      canvas.addEventListener('contextmenu', (event) => event.preventDefault());

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
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    redo() {
      if (!this.redoActions.length || this.activeStroke) return false;
      this.actions.push(this.redoActions.pop());
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    clear() {
      if (this.activeStroke || this.isVisuallyEmpty()) return false;
      this.actions.push({ type: 'clear' });
      this.redoActions = [];
      this._scheduleRender();
      this._emitChange();
      return true;
    }

    reset() {
      this.actions = [];
      this.redoActions = [];
      this.activeStroke = null;
      this.activePointerId = null;
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
        version: 1,
        logicalSize: this.options.logicalSize,
        actions: JSON.parse(JSON.stringify(this.actions)),
      };
    }

    load(payload) {
      if (!payload || payload.version !== 1 || !Array.isArray(payload.actions)) throw new Error('Unsupported drawing payload.');
      this.actions = payload.actions.filter((action) => {
        if (action.type === 'clear') return true;
        return action.type === 'stroke' && ['pen', 'eraser'].includes(action.tool) && Array.isArray(action.points);
      });
      this.redoActions = [];
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

    destroy() {
      if (this.destroyed) return;
      this.destroyed = true;
      cancelAnimationFrame(this.raf);
      this.canvas.removeEventListener('pointerdown', this._onPointerDown);
      this.canvas.removeEventListener('pointermove', this._onPointerMove);
      this.canvas.removeEventListener('pointerup', this._onPointerUp);
      this.canvas.removeEventListener('pointercancel', this._onPointerUp);
      this.resizeObserver?.disconnect();
      if (!this.resizeObserver) global.removeEventListener('resize', this._resize);
    }

    _resize() {
      if (this.destroyed) return;
      const rect = this.canvas.getBoundingClientRect();
      this.cssWidth = Math.max(1, rect.width);
      this.cssHeight = Math.max(1, rect.height);
      this.dpr = clamp(global.devicePixelRatio || 1, 1, this.options.maxDevicePixelRatio);
      const nextWidth = Math.max(1, Math.round(this.cssWidth * this.dpr));
      const nextHeight = Math.max(1, Math.round(this.cssHeight * this.dpr));
      if (this.canvas.width !== nextWidth || this.canvas.height !== nextHeight) {
        this.canvas.width = nextWidth;
        this.canvas.height = nextHeight;
      }
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

    _onPointerDown(event) {
      if (this.activePointerId !== null) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();

      this.activePointerId = event.pointerId;
      this.canvas.setPointerCapture?.(event.pointerId);
      const tool = this.options.tool;
      this.activeStroke = {
        type: 'stroke',
        tool,
        color: this.options.color,
        width: tool === 'eraser' ? Math.max(this.options.width * 2.6, 32) : this.options.width,
        points: [this._eventPoint(event)],
      };
      this.actions.push(this.activeStroke);
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

      for (const sourceEvent of events) {
        const point = this._eventPoint(sourceEvent);
        const previous = this.activeStroke.points[this.activeStroke.points.length - 1];
        const dx = point.x - previous.x;
        const dy = point.y - previous.y;
        if ((dx * dx + dy * dy) >= 0.0000008) this.activeStroke.points.push(point);
      }
      this._scheduleRender();
    }

    _onPointerUp(event) {
      if (event.pointerId !== this.activePointerId) return;
      event.preventDefault();

      if (this.activeStroke && event.type === 'pointerup') {
        const finalPoint = this._eventPoint(event);
        const previous = this.activeStroke.points[this.activeStroke.points.length - 1];
        const dx = finalPoint.x - previous.x;
        const dy = finalPoint.y - previous.y;
        if ((dx * dx + dy * dy) >= 0.0000008) this.activeStroke.points.push(finalPoint);
      }

      try { this.canvas.releasePointerCapture?.(event.pointerId); } catch (_) {}
      this.activePointerId = null;
      this.activeStroke = null;
      this._scheduleRender();
      this._emitChange();
    }

    _scheduleRender() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this._renderVisible());
    }

    _renderVisible() {
      const context = this.canvas.getContext('2d', { alpha: true });
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this._renderActions(context, this.cssWidth, this.cssHeight, this.actions);
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
