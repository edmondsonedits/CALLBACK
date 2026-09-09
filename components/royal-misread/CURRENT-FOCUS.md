# Royal Misread — Current Focus

**Current priority:** drawing system first.

Do not spend the next implementation pass on AI prompt tuning, scoring, voting, showcase animation, Pivot-style animation, or broader production polish unless the user explicitly changes priority.

The immediate goal is a valid, high-quality, phone-first drawing component that players can reliably use to create and submit images.

Primary reference: [`drawing-lab/`](./drawing-lab/README.md)

The drawing component should remain intentionally constrained: direct pen input, eraser, limited color/size choices, undo/redo, safe clear, sharp export, and reconnect-friendly editable stroke data. Add complexity only when it solves a demonstrated drawing problem.
