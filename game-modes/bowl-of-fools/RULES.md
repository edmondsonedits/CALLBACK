# Bowl of Fools — Implementation Contract

## Authority

The server owns teams, performer rotation, round/turn, deadline, scroll pool/order, pass allowance, correct/pass/undo ledger, scores, next-round starting team, sudden death and winner.

## Representative statechart

`SETUP → LOBBY → SCROLL_SUBMISSION → ROUND_INTRO → TURN_ACTIVE ↔ TURN_RESULT → ROUND_RESULT → NEXT_ROUND | SUDDEN_DEATH | GAME_OVER → HISTORY_FINALIZE`

Round Two's Drawing/Charades choice is frozen at game start.

## Scroll model

A private submission record may temporarily associate author and text for validation/deduplication, but public game projections and finalized history must omit the author relationship. If the association is unnecessary after setup, discard it before play.

Use stable scroll IDs so the same set can be reset across rounds without confusing duplicate text.

## Turn commands

- `MARK_CORRECT(commandId, turnId, scrollId)`
- `PASS(commandId, turnId, scrollId)`
- `HOST_UNDO(commandId, ledgerEventId)`
- `ADVANCE_ON_TIMEOUT(turnId)`

Validate current turn, actor permission, scroll ID, pass-used state and room version. Deduplicate command IDs.

## Scoring ledger

Append score events instead of mutating an unexplained total. Host undo appends a compensating reversal referencing the original correct event. Recompute/projection derives the displayed score.

## Empty bowl transition

End the turn/round atomically when the last remaining scroll is marked correct. Snapshot round scores, reset every scroll to available for the next round and assign the trailing team as starter. If cumulative scores are tied, use a clearly labelled temporary rule until approved.

## Sudden death

Enter a dedicated state after a final total tie. Use exactly one deciding scroll. Do not treat it as a full fourth round. The exact performer-selection presentation remains open.

## Remote Live projections

- Performer: current scroll, Correct, Pass, timer and selected performance surface.
- Performer's teammates: guessing view, timer and the camera/media view they individually select.
- Opponents: public progress/timer without the private scroll.
- Host: public state plus adjudication/Undo tools.
- Camera transport defaults to current performer only.
- Voice may be built in or external; game state never depends on media connection.

## Reconnect and absence

Reconnect restores stable identity, team, current projection and already-used pass. Do not restart the turn. Host-controlled absence handling must not duplicate performers or scrolls.

## Tests

Cover duplicate Correct, pass twice, timeout racing Correct, undo after turn end, empty-bowl atomicity, tied score transition, one-scroll sudden death, reconnect mid-turn, performer-only camera routing, voice disabled, per-client view changes and permanent author redaction.
