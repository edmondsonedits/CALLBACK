# Royal Misread Drawing Lab

**Status:** PROTOTYPE — drawing-system priority  
**Scope:** drawing only; no AI, voting, scoring, or multiplayer transport

## Goal

Provide a dependable phone-first drawing surface before additional Royal Misread game systems are built around it.

The player workflow is intentionally small:

1. Read one shared prompt.
2. Draw directly with finger, stylus, or mouse.
3. Use pen/eraser, color, size, undo/redo, or clear.
4. Tap **Done drawing**.
5. Review the exact 1024×1024 image that will be submitted.
6. Either return to the canvas or lock the drawing.

## Proven prototype behavior

- Pointer Events baseline for mouse, touch, and stylus.
- `getCoalescedEvents()` is feature-detected and used when available for higher-fidelity fast strokes.
- One active pointer owns a stroke, reducing accidental multi-touch marks.
- Pointer capture keeps a stroke continuous when a finger drifts to the canvas edge.
- Quadratic midpoint smoothing removes much of the jagged look of raw point-to-point input.
- Visible canvas backing resolution follows `devicePixelRatio` up to 3× so phone/Retina rendering stays sharp.
- Stroke coordinates are normalized rather than tied to one screen resolution.
- Editable actions are retained separately from the exported raster.
- True undo and redo.
- Clear is itself an undoable action and requires a second confirmation tap to prevent accidental deletion.
- Erasing is stored as a reversible stroke operation.
- Three brush widths and five deliberately limited colors.
- Large mobile touch controls, with the main controls at roughly 44–50 CSS pixels or larger.
- Responsive layout down to narrow phone widths.
- Preview-before-lock workflow prevents accidental final submission.
- Deterministic 1024×1024 PNG export on white, independent of the player's device size or pixel density.
- Serialized editable stroke payload is available for reconnect/resume support later.
- Keyboard shortcuts for desktop testing: Cmd/Ctrl+Z, Shift+Cmd/Ctrl+Z, P, E.

## Files

- `index.html` — standalone drawing test UI.
- `styles.css` — mobile-first drawing layout.
- `drawing-engine.js` — reusable drawing engine with no third-party dependency.
- `drawing-lab.js` — toolbar, preview, lock, and export behavior.

## Integration output

After **Use this drawing**, the lab exposes this prototype payload as `window.RoyalMisreadDrawingSubmission`:

```js
{
  imageDataUrl,  // 1024×1024 PNG for upload / image-reference generation
  strokeData,    // editable normalized actions for reconnect/resume
  width: 1024,
  height: 1024,
  mimeType: 'image/png',
  exportedAt
}
```

Production should upload the PNG to server-controlled durable media storage and submit only a durable media reference with the authoritative game command. The editable `strokeData` can be kept temporarily if reconnect/resume while drawing is desired.

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
- pressure-dependent brush art
- AI controls

The game benefits from easy, constrained drawings. Complexity should only be added to solve a demonstrated problem.

## Technical references

- MDN Pointer Events drawing: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events
- MDN coalesced pointer events: https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
- web.dev High DPI Canvas: https://web.dev/articles/canvas-hidipi
- Apple Game Controls / touch sizing: https://developer.apple.com/design/human-interface-guidelines/game-controls

## Next gate

Before moving deeper into AI interpretation or scoring, verify on at least one iPhone-class device and one Android-class device that:

- fast diagonal and circular strokes remain smooth;
- finger strokes start and end where expected;
- the page does not pan while drawing;
- controls are comfortable to tap one-handed;
- undo/redo/eraser behave predictably;
- preview matches the canvas;
- the exported image is sharp at 1024×1024;
- a drawing can be serialized, reloaded, and exported without changing its appearance.
