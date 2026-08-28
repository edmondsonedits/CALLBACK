# Game Architecture

## Architectural identity

CALLBACK is a **server-authoritative, room-based multiplayer game with an explicit finite-state game lifecycle**.

This is the default architecture Sites should preserve when adding features.

## Server authority

The authoritative server owns:

- room membership
- stable player identity
- host identity/permissions
- current game phase
- round number
- prompts
- phase deadlines
- submissions
- voting eligibility
- votes
- scores
- official round results
- official game winner

A client may optimistically animate or acknowledge input, but official state must come from the server.

## Lifecycle

Model the game as explicit states rather than a loose collection of booleans. A representative lifecycle is:

`ROOM_SETUP → LOBBY → ROUND_INTRO → PROMPT → SUBMISSION → REVEAL → VOTING → RESULTS → SCOREBOARD → NEXT_ROUND/FINALE → GAME_OVER`

Individual game modes may add substates, but they should still fit inside an explicit authoritative lifecycle.

## Stable identity

A reconnecting player should recover the same server-side player identity rather than silently creating a duplicate player. Display name and avatar are attributes of that identity, not identity itself.

## Deadlines

Timers displayed by clients are presentation of a server-owned deadline. Clients should not independently decide that a phase ended.

## Validation

Validate every state-changing command against current phase, room membership, player eligibility and expected payload shape before applying it.

## Vocabulary-first engineering

Before writing generic infrastructure, identify the established concept first. Examples:

- finite-state machine/statechart for lifecycle
- authoritative server for multiplayer state
- reconnect token/session identity for stable players
- schema validation for network messages
- idempotency/deduplication for retry-safe actions
- server timestamps/deadlines for synchronized timers

Use mature solutions where available. Keep custom code focused on CALLBACK-specific rules and presentation.

## Separation of concerns

Maintain this ordering:

**game rules → authoritative state transition → AI/content side effects → presentation**

UI, animation and AI output must not silently redefine rules.
