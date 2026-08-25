(() => {
  'use strict';

  const featureHelp = {
    face: ['Face', 'Shape, skin tone and proportions'],
    hair: ['Hair', 'Style, colour and hairline'],
    brows: ['Brows', 'Shape, spacing and angle'],
    eyes: ['Eyes', 'Shape, colour, size and spacing'],
    nose: ['Nose', 'Shape, size and height'],
    mouth: ['Mouth', 'Smile shape, width and height'],
    facialHair: ['Beard', 'Style, colour and size'],
    glasses: ['Glasses', 'Frame style, size and placement'],
    outfit: ['Outfit', 'Clothing style and colours'],
    extras: ['Extras', 'Hats and stackable details'],
    body: ['Body', 'Build, height and width']
  };

  const stage = document.getElementById('avatarStage');
  const dock = document.getElementById('editPreviewAvatar');
  const featureNav = document.getElementById('featureNav');
  const featureName = document.getElementById('editPreviewFeature');
  const featureHint = document.getElementById('editPreviewHint');
  const editorWorkspace = document.getElementById('editorWorkspace');

  function syncAvatar() {
    if (!stage || !dock) return;
    const svg = stage.querySelector('.avatar-svg');
    dock.replaceChildren();
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.removeAttribute('aria-label');
    clone.setAttribute('aria-hidden', 'true');
    dock.appendChild(clone);
  }

  function currentFeature() {
    const active = featureNav?.querySelector('.feature-tab.active');
    return active?.dataset?.feature || 'face';
  }

  function syncFeature() {
    const key = currentFeature();
    const [label, hint] = featureHelp[key] || featureHelp.face;
    if (featureName) featureName.textContent = label;
    if (featureHint) featureHint.textContent = hint;
  }

  function polishControls() {
    if (!editorWorkspace) return;

    editorWorkspace.querySelectorAll('.option-card').forEach(button => {
      const label = button.querySelector('.option-label')?.textContent?.trim();
      if (label) {
        if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', label);
        button.title = label;
      }
    });

    editorWorkspace.querySelectorAll('.color-chip').forEach(button => {
      const value = button.dataset.optionValue || button.dataset.outfitAccent;
      if (value && !button.getAttribute('aria-label')) {
        const readable = value.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
        button.setAttribute('aria-label', readable);
        button.title = readable;
      }
    });

    editorWorkspace.querySelectorAll('input[type="range"]').forEach(input => {
      input.setAttribute('aria-valuetext', input.value);
    });
  }

  if (stage) {
    new MutationObserver(syncAvatar).observe(stage, { childList: true });
  }

  if (featureNav) {
    featureNav.addEventListener('click', () => requestAnimationFrame(syncFeature));
    new MutationObserver(syncFeature).observe(featureNav, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  if (editorWorkspace) {
    new MutationObserver(polishControls).observe(editorWorkspace, {
      subtree: true,
      childList: true
    });
  }

  syncAvatar();
  syncFeature();
  polishControls();
})();
