# Open Decisions

These items are intentionally not treated as settled. Sites should not invent permanent answers to them unless necessary for a prototype; temporary assumptions must be labeled.

## Naming / branding

- Whether the final public product name is CALLBACK, King Prompter, or another approved final name.
- How CALLBACK and King Prompter should coexist if both names remain useful (product, mode, universe, internal project name, etc.).

## Game-mode specification

- Final approved list of active game modes.
- Exact rules, round counts, timing and scoring for each remaining mode where not yet documented.
- Which castle room corresponds to each game mode.

## AI / image generation

- Final production model lineup and fallback policy.
- Exact host-facing model-selection UX.
- Production moderation/failure behavior and timeouts.
- Whether image generation happens fully during another round, asynchronously from the player perspective, or through another approved pacing pattern.

## Audio / host performance

- Final pigeon voice direction.
- Final music system and per-room music language.
- Which reactions are voiced versus text-only.

## Production implementation

- Final hosting/backend stack used by the full Sites version.
- Exact reconnect/session persistence mechanism.
- Exact library choices for realtime transport, validation and durable room state where Sites architecture allows choice.

## Component promotion

A component may move from PROTOTYPE to APPROVED only after its behavior is reviewed against the Bible. A component may move to INTEGRATED only when the production/Sites implementation is confirmed to use it or an equivalent contract.
