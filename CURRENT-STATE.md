# Current State

_Last updated: 2026-08-28_

## Product identity

**Working/current direction:** CALLBACK / King Prompter

**Product:** mobile-first multiplayer party game built and iterated in ChatGPT Sites.

**GitHub's role:** authoritative project Bible, design/engineering guidance, decision history and isolated component-testing lab. GitHub is not required to contain the complete production game.

## Core architecture

Approved architecture: **server-authoritative, room-based multiplayer with an explicit finite-state game lifecycle**.

The authoritative server owns official room/player/game state. Clients render state and submit requests/actions.

## Creative direction

Approved overarching theme: **chaotic medieval castle game show**.

Recurring anchors:

- theatrical pigeon host/mascot
- crown as symbol of victory/conflict
- castle rooms/areas as locations for different games
- comic theatrical chaos rather than realistic medieval fantasy
- established opening language: typing, AI processing, royal pigeon scene, crown fight, comic explosion, main-menu reveal and looping menu animation

Core palette direction:

- navy
- cream
- crown yellow
- coral
- cyan
- purple

## Player/product direction

- Mobile first.
- Room-code join flow.
- Host creates/configures the room.
- No audience mode in the current confirmed scope.
- Primary emotional goal: laughter.
- Player-created prompts are an optional system, currently intended to be enabled by default unless later changed.
- Submissions are not revealed early.
- Scoring escalates in later rounds.
- Game should blend skill and luck rather than reward only the naturally funniest player.

## Removed / do not restore

The following game concepts were explicitly removed and should not be reintroduced without a new explicit decision:

- Question Cards
- Legacy Quick
- Legacy Extended

See `decisions/DEPRECATED.md`.

## Current approved component prototypes

### Avatar Studio v2

**Status:** APPROVED PROTOTYPE — ready to guide integration, not yet proof of production multiplayer integration.

Location: `components/avatar-studio/`

Proven/reference-worthy:

- compact avatar configuration model
- local SVG reconstruction
- modular renderer
- fine-tune editor
- family presets
- reusable avatar animation vocabulary
- mobile editing UX

Demo-only / not production authority:

- local fake lobby
- local-storage-only save behavior
- any player/room behavior shown by the studio

## Immediate repository purpose

Use the Bible to progressively document game modes, lifecycle rules, UI behavior, AI/image systems and creative direction as they are approved. Use `components/` to prototype individual systems before integrating them into Sites.
