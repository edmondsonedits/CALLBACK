# Open Decisions

These items are intentionally not treated as settled. Sites should not invent permanent answers to them unless necessary for a prototype; temporary assumptions must be labeled.

## Naming / branding

- Whether the final public product name is CALLBACK, King Prompter, or another approved final name.
- How CALLBACK and King Prompter should coexist if both names remain useful (product, mode, universe, internal project name, etc.).

## Game-mode specification

- Final approved list of active game modes.
- Exact rules, round counts, timing and scoring for modes other than the approved King Prompter redesign where not yet documented.
- Which castle room corresponds to each game mode.

King Prompter's creative rules are now approved in `game-modes/king-prompter/`. Its exact base point values, small ingredient-bonus amount, scalable ballot formula and final phase durations remain playtest tuning variables rather than unresolved creative-direction decisions.

## AI / image generation

- Final production model lineup and fallback policy.
- Exact host-facing model-selection UX.
- Production moderation/failure behavior and timeouts.
- Final asynchronous pacing strategy for modes other than the approved King Prompter redesign.

For King Prompter, image generation is approved to overlap the Canvas Two influence ballot and pigeon-led TV presentation. AI and the pigeon remain non-authoritative.

## Audio / host performance

- Final pigeon voice identity/performance.
- Final music system and per-room music language.
- Exact reaction library and production recordings.

For King Prompter, narration at key moments, visible text for essential instructions and host-adjustable teasing are approved. Constant commentary is not the approved default.

## Production implementation

- Final hosting/backend stack used by the full Sites version.
- Exact reconnect/session persistence mechanism.
- Exact library choices for realtime transport, validation and durable room state where Sites architecture allows choice.

## Component promotion

A component may move from PROTOTYPE to APPROVED only after its behavior is reviewed against the Bible. A component may move to INTEGRATED only when the production/Sites implementation is confirmed to use it or an equivalent contract.
