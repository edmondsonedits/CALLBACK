(() => {
  'use strict';

  const root = document.getElementById('drawingLab');
  const canvas = document.getElementById('drawingCanvas');
  const drawCard = document.querySelector('.draw-card');
  const previewPanel = document.getElementById('previewPanel');
  const lockedPanel = document.getElementById('lockedPanel');
  const previewImage = document.getElementById('previewImage');
  const status = document.getElementById('statusMessage');

  const draftNotice = document.getElementById('draftNotice');
  const discardDraftButton = document.getElementById('discardDraftButton');
  const penButton = document.getElementById('penTool');
  const sizeToolButton = document.getElementById('sizeTool');
  const eraserButton = document.getElementById('eraserTool');
  const paletteTray = document.getElementById('paletteTray');
  const sizeTray = document.getElementById('sizeTray');
  const activeColorChip = document.getElementById('activeColorChip');
  const activeSizeDot = document.getElementById('activeSizeDot');
  const undoButton = document.getElementById('undoButton');
  const redoButton = document.getElementById('redoButton');
  const clearButton = document.getElementById('clearButton');
  const doneButton = document.getElementById('doneButton');
  const keepDrawingButton = document.getElementById('keepDrawingButton');
  const useDrawingButton = document.getElementById('useDrawingButton');
  const newDrawingButton = document.getElementById('newDrawingButton');

  const DRAFT_KEY = 'royal-misread:drawing-draft:v2';
  const DRAFT_MAX_AGE_MS = 6 * 60 * 60 * 1000;
  let clearArmedUntil = 0;
  let clearResetTimer = 0;
  let draftSaveTimer = 0;
  let latestExport = null;

  const engine = new RoyalDrawingEngine(canvas, {
    logicalSize: 1024,
    maxDevicePixelRatio: 3,
    color: '#171923',
    width: 12,
    tool: 'pen',
    touchSmoothing: 0.72,
    penSmoothing: 0.9,
    mouseSmoothing: 0.82,
    onChange: handleDrawingChange,
  });

  function announce(message) {
    status.textContent = '';
    requestAnimationFrame(() => { status.textContent = message; });
  }

  function handleDrawingChange(snapshot = {}) {
    updateHistoryControls(snapshot);
    scheduleDraftSave();
  }

  function updateHistoryControls(snapshot = {}) {
    undoButton.disabled = !(snapshot.canUndo ?? engine.canUndo());
    redoButton.disabled = !(snapshot.canRedo ?? engine.canRedo());
    const empty = snapshot.isEmpty ?? engine.isVisuallyEmpty();
    clearButton.disabled = empty;
    doneButton.disabled = empty;
  }

  function setTool(tool, announceSelection = true) {
    engine.setTool(tool);
    const isPen = tool === 'pen';
    penButton.classList.toggle('is-active', isPen);
    penButton.setAttribute('aria-pressed', String(isPen));
    eraserButton.classList.toggle('is-active', !isPen);
    eraserButton.setAttribute('aria-pressed', String(!isPen));
    if (announceSelection) announce(isPen ? 'Pen selected.' : 'Eraser selected.');
  }

  function closeTrays(except = null) {
    if (except !== 'palette') paletteTray.hidden = true;
    if (except !== 'size') sizeTray.hidden = true;
    penButton.setAttribute('aria-expanded', String(!paletteTray.hidden));
    sizeToolButton.setAttribute('aria-expanded', String(!sizeTray.hidden));
  }

  function toggleTray(name) {
    const target = name === 'palette' ? paletteTray : sizeTray;
    const willOpen = target.hidden;
    closeTrays(name);
    target.hidden = !willOpen;
    penButton.setAttribute('aria-expanded', String(!paletteTray.hidden));
    sizeToolButton.setAttribute('aria-expanded', String(!sizeTray.hidden));
  }

  function setColor(button) {
    document.querySelectorAll('[data-color]').forEach((item) => item.classList.toggle('is-active', item === button));
    const color = button.dataset.color;
    engine.setColor(color);
    activeColorChip.style.setProperty('--active-color', color);
    setTool('pen', false);
    closeTrays();
    announce(`${button.getAttribute('aria-label')} selected.`);
  }

  function setSize(button) {
    document.querySelectorAll('[data-size]').forEach((item) => item.classList.toggle('is-active', item === button));
    const size = Number(button.dataset.size);
    engine.setWidth(size);
    activeSizeDot.className = `active-size-dot ${size <= 7 ? 'size-small' : size >= 22 ? 'size-large' : 'size-medium'}`;
    closeTrays();
    announce(`${button.getAttribute('aria-label')} selected.`);
  }

  function disarmClear() {
    clearArmedUntil = 0;
    clearButton.textContent = 'Clear';
    clearButton.classList.remove('is-armed');
    clearTimeout(clearResetTimer);
  }

  function scheduleDraftSave() {
    clearTimeout(draftSaveTimer);
    draftSaveTimer = setTimeout(saveDraft, 220);
  }

  function saveDraft() {
    try {
      if (engine.isVisuallyEmpty()) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      const record = { savedAt: Date.now(), payload: engine.serialize() };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(record));
    } catch (_) {
      // Recovery is a convenience only. Drawing must still work if storage is unavailable or full.
    }
  }

  function removeDraft() {
    clearTimeout(draftSaveTimer);
    try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
    draftNotice.hidden = true;
  }

  function recoverDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const record = JSON.parse(raw);
      if (!record?.payload || !Number.isFinite(record.savedAt) || Date.now() - record.savedAt > DRAFT_MAX_AGE_MS) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      engine.load(record.payload);
      draftNotice.hidden = false;
      announce('Recovered an unfinished drawing.');
    } catch (_) {
      try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
    }
  }

  discardDraftButton.addEventListener('click', () => {
    engine.reset();
    removeDraft();
    latestExport = null;
    closeTrays();
    announce('Recovered drawing discarded.');
  });

  penButton.addEventListener('click', () => {
    setTool('pen', false);
    toggleTray('palette');
    announce(paletteTray.hidden ? 'Pen selected.' : 'Color choices opened.');
  });

  sizeToolButton.addEventListener('click', () => {
    toggleTray('size');
    announce(sizeTray.hidden ? 'Brush size choices closed.' : 'Brush size choices opened.');
  });

  eraserButton.addEventListener('click', () => {
    closeTrays();
    setTool('eraser');
  });

  document.querySelectorAll('[data-color]').forEach((button) => {
    button.addEventListener('click', () => setColor(button));
  });

  document.querySelectorAll('[data-size]').forEach((button) => {
    button.addEventListener('click', () => setSize(button));
  });

  canvas.addEventListener('pointerdown', () => closeTrays());

  undoButton.addEventListener('click', () => {
    disarmClear();
    closeTrays();
    if (engine.undo()) announce('Undid the last action.');
  });

  redoButton.addEventListener('click', () => {
    disarmClear();
    closeTrays();
    if (engine.redo()) announce('Redid the action.');
  });

  clearButton.addEventListener('click', () => {
    closeTrays();
    const now = Date.now();
    if (now < clearArmedUntil) {
      disarmClear();
      if (engine.clear()) announce('Canvas cleared. Undo is available.');
      return;
    }
    clearArmedUntil = now + 2800;
    clearButton.textContent = 'Tap again';
    clearButton.classList.add('is-armed');
    announce('Tap Clear again to clear the drawing.');
    clearResetTimer = setTimeout(disarmClear, 2850);
  });

  doneButton.addEventListener('click', () => {
    if (engine.isVisuallyEmpty()) return;
    disarmClear();
    closeTrays();
    saveDraft();
    latestExport = {
      pngDataUrl: engine.exportDataURL(1024, 'image/png'),
      strokeData: engine.serialize(),
      exportedAt: new Date().toISOString(),
    };
    previewImage.src = latestExport.pngDataUrl;
    drawCard.hidden = true;
    lockedPanel.hidden = true;
    previewPanel.hidden = false;
    previewPanel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    announce('Submission preview opened.');
  });

  keepDrawingButton.addEventListener('click', () => {
    previewPanel.hidden = true;
    drawCard.hidden = false;
    requestAnimationFrame(() => {
      canvas.scrollIntoView({ behavior: 'auto', block: 'center' });
      canvas.focus();
    });
    announce('Back to drawing.');
  });

  useDrawingButton.addEventListener('click', async () => {
    if (!latestExport) return;
    previewPanel.hidden = true;
    drawCard.hidden = true;
    lockedPanel.hidden = false;
    removeDraft();

    let imageBlob = null;
    try { imageBlob = await engine.exportBlob(1024, 'image/png'); } catch (_) {}

    window.RoyalMisreadDrawingSubmission = Object.freeze({
      imageDataUrl: latestExport.pngDataUrl,
      imageBlob,
      strokeData: latestExport.strokeData,
      width: 1024,
      height: 1024,
      mimeType: 'image/png',
      exportedAt: latestExport.exportedAt,
    });

    announce('Drawing locked and ready for game submission.');
  });

  newDrawingButton.addEventListener('click', () => {
    latestExport = null;
    delete window.RoyalMisreadDrawingSubmission;
    removeDraft();
    engine.reset();
    setTool('pen', false);
    document.querySelector('[data-size="12"]')?.click();
    document.querySelector('[data-color="#171923"]')?.click();
    lockedPanel.hidden = true;
    previewPanel.hidden = true;
    drawCard.hidden = false;
    requestAnimationFrame(() => canvas.scrollIntoView({ behavior: 'auto', block: 'center' }));
    announce('New drawing started.');
  });

  root.addEventListener('keydown', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;

    const modifier = event.ctrlKey || event.metaKey;
    if (modifier && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) {
        if (engine.redo()) announce('Redid the action.');
      } else if (engine.undo()) {
        announce('Undid the last action.');
      }
      return;
    }

    if (!modifier && !event.altKey && event.key.toLowerCase() === 'e') {
      event.preventDefault();
      closeTrays();
      setTool('eraser');
    }
    if (!modifier && !event.altKey && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      closeTrays();
      setTool('pen');
    }
  });

  window.RoyalMisreadDrawingLab = Object.freeze({
    engine,
    exportPNG: () => engine.exportDataURL(1024, 'image/png'),
    exportBlob: () => engine.exportBlob(1024, 'image/png'),
    serialize: () => engine.serialize(),
    load: (payload) => engine.load(payload),
    reset: () => engine.reset(),
  });

  updateHistoryControls();
  recoverDraft();
})();
