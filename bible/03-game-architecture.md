# Game Architecture

## Architectural identity

CALLBACK is a **server-authoritative, room-based multiplayer game with explicit finite-state lifecycles and role-specific state projections**.

## Server authority

The authoritative server owns room membership, stable identities, host permissions, teams/roles, phase, round/turn, deadlines, content order, submissions, voting/guessing eligibility, accepted actions, score ledger, results, winners and match finalization.

Clients may acknowledge input optimistically, but official state comes from the server.

## Mode state machines

Do not force every mode into one oversimplified sequence. A collection-level shell owns room setup, lobby, mode selection, reconnect and terminal finalization. Each mode supplies an explicit statechart for its own mechanics.

Representative families:

- Submission/voting: intro → prompt → submit → generate/reveal → vote → result
- Turn/performance: round intro → performer turn → correct/pass/timeout → next turn → round result
- Council strategy: briefing → private ranking → council/commander action → reveal → scoring → mirrored replay

Transitions are commands/events, not UI booleans.

## Stable identity and reconnect

A reconnect token/session recovers the same player. The server restores current team, role, consumed actions and a projection appropriate to that player. Reloading never grants another vote, pass, submission or turn.

## Command contract

Every state-changing command carries a command ID and expected room/state version. Validate schema, identity, permission, current phase, eligibility and payload. Deduplicate retries and return the latest projection when a client is stale.

## Deadlines

Clients display server-owned deadlines. Only the server advances on timeout.

## Side effects

AI generation, media storage, voice/video sessions, narration and History Books persistence are side effects around authoritative rules. Use job IDs and idempotent handlers. A side-effect failure cannot silently change the score or trap a match.

## Media

Voice/video is transport, not game authority. Bowl of Fools spoken guesses are adjudicated through explicit game actions. In Remote Live, current-performer-only video is the default projection/transport policy and each client controls its own view.

## Persistence and history

Live room state and public match history are different models. At terminal state, create one immutable/versioned public match record through an idempotent finalization key. Store metadata separately from media objects and preserve mode-specific privacy redactions.

## Separation of concerns

**mode rules → authoritative transition → side effects → role projection → presentation**
