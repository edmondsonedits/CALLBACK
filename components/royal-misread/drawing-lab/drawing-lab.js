(() => {
  'use strict';

  const root = document.getElementById('drawingLab');
  const canvas = document.getElementById('drawingCanvas');
  const drawCard = document.querySelector('.draw-card');
  const previewPanel = document.getElementById('previewPanel');
  const lockedPanel = document.getElementById('lockedPanel');
  const previewImage = document.getElementById('previewImage');
  const status = document.getElementById('statusMessage');

  const penButton = document.getElementById('penTool');
  const eraserButton = document.getElementById('eraserTool');
  const undoButton = document.getElementById('undoButton');
  const redoButton = document.getElementById('redoButton');
  const clearButton = document.getElementById('clearButton');
  const doneButton = document.getElementById('doneButton');
  const keepDrawingButton = document.getElementById('keepDrawingButton');
  const useDrawingButton = document.getElementById('useDrawingButton');
  const newDrawingButton = document.getElementById('newDrawingButton');

  let clearArmedUntil = 0;
  let clearResetTimer = 0;
  let latestExport = null;

  const engine = new RoyalDrawingEngine(canvas, {
    logicalSize: 1024,
    maxDevicePixelRatio: 3,
    color: '#171923',
    width: 12,
    tool: 'pen',
    onChange: updateHistoryControls,
  });

  function announce(message) {
    status.textContent = '';
    requestAnimationFrame(() => { status.textContent = message; });
  }

  function updateHistoryControls(snapshot = {}) {
    undoButton.disabled = !(snapshot.canUndo ?? engine.canUndo());
    redoButton.disabled = !(snapshot.canRedo ?? engine.canRedo());
    const empty = snapshot.isEmpty ?? engine.isVisuallyEmpty();
    clearButton.disabled = empty;
    doneButton.disabled = empty;
  }

  function setTool(tool) {
    engine.setTool(tool);
    const isPen = tool === 'pen';
    penButton.classList.toggle('is-active', isPen);
    penButton.setAttribute('aria-pressed', String(isPen));
    eraserButton.classList.toggle('is-active', !isPen);
    eraserButton.setAttribute('aria-pressed', String(!isPen));
    announce(isPen ? 'Pen selected.' : 'Eraser selected.');
  }

  function setColor(button) {
    document.querySelectorAll('[data-color]').forEach((item) => item.classList.toggle('is-active', item === button));
    engine.setColor(button.dataset.color);
    setTool('pen');
  }

  function setSize(button) {
    document.querySelectorAll('[data-size]').forEach((item) => item.classList.toggle('is-active', item === button));
    engine.setWidth(Number(button.dataset.size));
    announce(`${button.getAttribute('aria-label')} selected.`);
  }

  function disarmClear() {
    clearArmedUntil = 0;
    clearButton.textContent = 'Clear';
    clearButton.classList.remove('is-armed');
    clearTimeout(clearResetTimer);
  }

  penButton.addEventListener('click', () => setTool('pen'));
  eraserButton.addEventListener('click', () => setTool('eraser'));

  document.querySelectorAll('[data-color]').forEach((button) => {
    button.addEventListener('click', () => setColor(button));
  });

  document.querySelectorAll('[data-size]').forEach((button) => {
    button.addEventListener('click', () => setSize(button));
  });

  undoButton.addEventListener('click', () => {
    disarmClear();
    if (engine.undo()) announce('Undid the last action.');
  });

  redoButton.addEventListener('click', () => {
    disarmClear();
    if (engine.redo()) announce('Redid the action.');
  });

  clearButton.addEventListener('click', () => {
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
      canvas.focus?.();
    });
    announce('Back to drawing.');
  });

  useDrawingButton.addEventListener('click', () => {
    if (!latestExport) return;
    previewPanel.hidden = true;
    drawCard.hidden = true;
    lockedPanel.hidden = false;

    window.RoyalMisreadDrawingSubmission = Object.freeze({
      imageDataUrl: latestExport.pngDataUrl,
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
    engine.reset();
    setTool('pen');
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
      setTool('eraser');
    }
    if (!modifier && !event.altKey && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      setTool('pen');
    }
  });

  window.RoyalMisreadDrawingLab = Object.freeze({
    engine,
    exportPNG: () => engine.exportDataURL(1024, 'image/png'),
    serialize: () => engine.serialize(),
    load: (payload) => engine.load(payload),
    reset: () => engine.reset(),
  });

  updateHistoryControls();
})();
