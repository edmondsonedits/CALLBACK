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

## King Prompter mode — approved redesign

The authoritative specification is in `game-modes/king-prompter/`. It is approved but not yet proof of integration in the live Sites game.

Approved decisions:

- The main source of fun is players competing through their creativity.
- Target a 15–20-minute match.
- Keep Canvas One, Canvas Two and the Crown Gallery.
- Remove prompt-ranking phases and their score events.
- During image voting, always show the originating prompt beside its generated image or controlled fallback.
- Immediately after locking Canvas One, each player may submit one optional Canvas Two theme or art-style idea.
- During Canvas One generation, players vote on a scalable anonymous mixture of curated and player-submitted Canvas Two choices.
- Self-voting on a submitted Canvas Two choice is prohibited.
- Reveal player authors only after the influence ballot.
- Use the top two choices regardless of category and combine conflicting winners rather than replacing them.
- Give winning player-submitted ingredients a small fixed bonus.
- Canvas Two image voting is worth 1.5× Canvas One.
- One winning position from each canvas reaches the Crown Gallery, and every image tied for either winning position advances.
- The pigeon is presentation only and never judges, votes, scores or selects winners.
- Pigeon teasing is host-adjustable, narration is used at key moments, and safe avatar spotlights may celebrate submissions, image wins and random harmless comedy moments.
- Exact numeric point values, bonus amount, ballot-size formula and phase durations are balance variables to validate through multiplayer testing.

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
