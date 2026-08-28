# Approved Decisions

These decisions are authoritative until the user explicitly changes them.

## Repository role

- GitHub is the project Bible and component lab for CALLBACK / King Prompter.
- The complete playable game may live in ChatGPT Sites.
- Sites should consult this repository before making meaningful product, architecture, gameplay or visual changes.

## Architecture

- Use a **server-authoritative, room-based multiplayer architecture**.
- Use an explicit finite-state game lifecycle.
- Server authority includes room membership, stable player identity, current phase, round number, prompts, deadlines, submissions, voting eligibility, votes, scoring and official results.
- Clients request actions and render state; they do not independently decide official game state.
- Prefer mature libraries/patterns for generic infrastructure and custom code for CALLBACK-specific gameplay.

## Core player experience

- Mobile first.
- Players join with a room code.
- A host creates/configures the game.
- No audience mode in the currently approved scope.
- The primary emotional target is laughter.
- Do not reveal submissions before the intended reveal/voting phase.
- Scoring should make later rounds matter more.
- The experience should blend skill and luck and include mechanisms that help less naturally funny players participate successfully.

## Prompts / content

- Default prompt pool is supported.
- Player-created prompts are optional and currently intended to be enabled by default.
- Image generation is part of the broader game direction.

## Creative direction

- Overarching world: **chaotic medieval castle game show**.
- The pigeon is the theatrical host/mascot.
- The crown is the central victory/conflict symbol.
- Different castle locations may provide backgrounds/sets for different games.
- Preserve the established opening/menu sequence language: typing → AI processing → royal pigeon mini-scene → crown fight → comic explosion → main-menu reveal / loop.
- Core palette direction: navy, cream, crown yellow, coral, cyan and purple.
- Tone should be theatrical, playful, absurd and controlled-chaotic rather than realistic or grim.

## Avatars

- Use a compact avatar configuration that can be reconstructed locally rather than synchronizing image files.
- The Avatar Studio v2 is an approved prototype/reference implementation.
- Avatar animation vocabulary can be reused for lobby, waiting, voting, results and victory reactions.

## Removed game modes

The following are permanently removed unless explicitly restored by the user:

- Question Cards
- Legacy Quick
- Legacy Extended
