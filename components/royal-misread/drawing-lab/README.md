# Royal Misread Drawing Lab

**Status:** PROTOTYPE — drawing-system priority  
**Scope:** drawing only; no AI, voting, scoring, or multiplayer transport

## Goal

Provide a dependable phone-first drawing surface before additional Royal Misread game systems are built around it.

The player workflow is intentionally small:

1. Read one shared prompt.
2. Draw directly with finger, stylus, or mouse.
3. Use the compact dock for undo, redo, ink, brush size, and eraser.
4. Expand color or size choices only when needed.
5. Tap **Done drawing**.
6. Review the exact 1024×1024 image that will be submitted.
7. Either return to the canvas or lock the drawing.

## Research-informed UI direction

The lab intentionally borrows patterns rather than cloning any one editor:

- **Magma mobile / Super Simple mode:** protect canvas space by hiding secondary panels and grouping tools on small screens. Royal Misread now keeps only five primary controls visible and expands color/size trays on demand.
- **Gartic Phone / Skribbl:** keep game drawing colors immediately understandable with visual preset swatches rather than a professional color-picker dialog. Royal Misread uses eight curated colors.
- **Excalidraw:** keep undo/redo persistent and reachable near the drawing surface.
- **Kleki:** fast-access HUD concepts and automatic recovery informed the compact controls and local unfinished-drawing recovery.
- **Signature Pad / Atrament / perfect-freehand:** mature free/open-source drawing tools emphasize smoothing, filtering noisy points, normalized input and high-DPI correctness. Royal Misread keeps its own small dependency-free engine but adopts those engineering principles.

The party-game constraint remains more important than feature parity with drawing software. Tools that do not improve fast, understandable sketching stay excluded.

## Proven prototype behavior

- Pointer Events baseline for mouse, touch, and stylus.
- `getCoalescedEvents()` is feature-detected and used when available for higher-fidelity fast strokes.
- Input points receive light device-specific smoothing: touch gets more stabilization than stylus, while remaining responsive.
- Very-near duplicate points are filtered to reduce jitter and unnecessary work.
- One active primary pointer owns a stroke, reducing accidental multi-touch marks.
- Pointer capture keeps a stroke continuous when a finger drifts to the canvas edge.
- Quadratic midpoint smoothing removes much of the jagged look of raw point-to-point input.
- Completed strokes are cached as a bitmap while drawing; pointer movement redraws the cache plus the current stroke rather than replaying the entire history every frame.
- Undo/redo/load/resize deterministically rebuild that cache from normalized editable actions.
- Visible canvas backing resolution follows `devicePixelRatio` up to 3× so phone/Retina rendering stays sharp.
- Stroke coordinates are normalized rather than tied to one screen resolution.
- Editable actions are retained separately from the exported raster.
- True undo and redo.
- Clear is itself an undoable action and requires a second confirmation tap to prevent accidental deletion.
- Erasing is stored as a reversible stroke operation.
- Three brush widths and eight curated colors.
- Compact five-button mobile dock: Undo, Redo, Ink, Size, Erase.
- Color and brush-size controls appear only when requested, preserving canvas space.
- Optional Compact prompt mode hides explanatory copy while retaining the actual drawing request.
- Large mobile touch controls, generally 44–50 CSS pixels or larger.
- Responsive layout down to narrow phone widths.
- Preview-before-lock workflow prevents accidental final submission.
- Deterministic 1024×1024 PNG export on white, independent of the player's device size or pixel density.
- Blob export is available for direct file upload without requiring Base64 in production.
- Serialized editable stroke payload is available for reconnect/resume support later.
- Unfinished drawings are automatically recovered from local storage for up to six hours after an accidental refresh/close; failure of local storage never blocks drawing.
- Keyboard shortcuts for desktop testing: Cmd/Ctrl+Z, Shift+Cmd/Ctrl+Z, P, E.

## Files

- `index.html` — standalone drawing test UI.
- `styles.css` — mobile-first canvas and compact tool dock.
- `drawing-engine.js` — reusable drawing engine with no third-party runtime dependency.
- `drawing-lab.js` — toolbar trays, draft recovery, preview, lock, and export behavior.

## Integration output

After **Use this drawing**, the lab exposes this prototype payload as `window.RoyalMisreadDrawingSubmission`:

```js
{
  imageDataUrl,  // 1024×1024 PNG preview / compatibility path
  imageBlob,     // PNG Blob preferred for production upload
  strokeData,    // editable normalized actions for reconnect/resume
  width: 1024,
  height: 1024,
  mimeType: 'image/png',
  exportedAt
}
```

Production should upload `imageBlob` to server-controlled durable media storage and submit only a durable media reference with the authoritative game command. The editable `strokeData` can be retained temporarily if reconnect/resume while drawing is desired.

## Deliberately excluded for now

Do not add these until the basic drawing experience has been evaluated on real phones:

- layers
- shape tools
- fill bucket
- text
- stickers
- zoom/pan
- animation frames
- Pivot-style joints
- advanced pressure-dependent art brushes
- AI controls

The game benefits from easy, constrained drawings. Complexity should only be added to solve a demonstrated problem.

## Research / technical references

- Magma phone guidance: https://help.magma.com/en/articles/8355709-how-to-use-magma-on-your-phone
- Magma mobile layout modes: https://help.magma.com/en/articles/15254322-getting-started-in-magma
- Kleki: https://kleki.com/home/
- Kleki 2025 recovery/mobile UI work: https://kleki.com/changelog-summary/
- Signature Pad (smooth mobile canvas): https://github.com/szimek/signature_pad
- Atrament (adaptive smoothing / normalized coordinates): https://github.com/jakubfiala/atrament
- perfect-freehand (MIT freehand stroke reference): https://github.com/steveruizok/perfect-freehand
- MDN Pointer Events drawing: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events
- MDN coalesced pointer events: https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
- web.dev High DPI Canvas: https://web.dev/articles/canvas-hidipi
- Apple Game Controls / touch sizing: https://developer.apple.com/design/human-interface-guidelines/game-controls

## Next gate

Before moving deeper into AI interpretation or scoring, verify on at least one iPhone-class device and one Android-class device that:

- fast diagonal, circular and tiny-detail strokes remain smooth;
- long drawings do not become progressively laggy as stroke count rises;
- finger strokes start and end where expected;
- the page does not pan while drawing;
- compact controls are comfortable to use one-handed;
- opening/closing color and size trays does not obstruct the canvas;
- undo/redo/eraser behave predictably;
- an accidental refresh restores the unfinished drawing;
- preview matches the canvas;
- the exported image is sharp at 1024×1024;
- a drawing can be serialized, reloaded, and exported without changing its appearance.
