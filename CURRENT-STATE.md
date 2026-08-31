# Current State

_Last updated: 2026-08-31_

## Product

**Working product structure:** CALLBACK castle-party-game collection; King Prompter is the established lead mode and public title direction remains open.  
**Format:** mobile-first multiplayer party game built in ChatGPT Sites  
**GitHub role:** authoritative Bible, engineering guidance, decision history and component lab

Approved architecture: **server-authoritative, room-based multiplayer with explicit finite-state lifecycles**. Clients render projections and request actions; the server owns official outcomes.

## Creative direction

- Chaotic medieval/Renaissance castle game show
- Theatrical pigeon host
- Crown as the recurring symbol of victory and conflict
- Different castle areas stage different modes
- Controlled comic chaos rather than grim fantasy
- Navy, cream, crown yellow, coral, cyan and purple palette

## Active modes

### King Prompter

**Status:** INTEGRATED IN SITES; real-group playtest still required.

The approved three-round lifecycle is present: two shared-request painting rounds with overlapping generation and 100/150 scoring, followed by 300-point Royal Restoration. Restoration uses reusable torn-section overlays around an immutable King, an all-ages request pool and a tutorial enabled by default that the host may skip. Automated lifecycle tests, TypeScript validation and production build have passed. A real 4–6-player test remains the pacing and comprehension gate.

### Royal War Room

**Status:** INTEGRATED AND PUBLISHED.

The live mode uses two councils, hidden six-order rankings, an Attack phase followed by a guaranteed Defend replay, rotating commanders, Spyglass clues, team scoring, reconnect support and rules/History integration. The authoritative summary is `game-modes/royal-war-room/README.md`.

### Bowl of Fools (working title)

**Status:** APPROVED RULE DIRECTION; Sites integration not verified.

This is the Fishbowl-derived team mode for local or Remote Live play. The same anonymous scrolls return across three rounds: Describe, host-selected Draw or Charades, then One Word. Confirmed rules include one pass per turn, the trailing team starts after a bowl is emptied, optional in-game voice, current-performer-only camera transmission, per-player customizable views, host undo for honor-system clue violations, author identities never revealed and one-scroll sudden death for a final tie.

### Public History Books

**Status:** APPROVED PRODUCT REQUIREMENT; production completeness not verified.

A separate public page must preserve organized match history, rosters/avatars, prompts and generated images, settings, scores, winners and other sensible match metadata. Bowl of Fools scroll authors must remain permanently anonymous. See `bible/08-history-books.md`.

## Infrastructure direction

- Keep Cloudflare as the current production direction.
- AI/media work is non-authoritative and must not block the match.
- A future self-hosted ComfyUI path for adult-content games is a separate later possibility, not current production scope.

## Removed modes

Do not restore Question Cards, Legacy Quick or Legacy Extended without explicit approval.

## Current priorities

1. Verify the public History Books implementation and persistence against the Bible.
2. Implement and multiplayer-test Bowl of Fools in both local and Remote Live configurations.
3. Conduct the real 4–6-player King Prompter pacing test.
4. Preserve Royal War Room's published rules while expanding its detailed Bible only from verified behavior.
