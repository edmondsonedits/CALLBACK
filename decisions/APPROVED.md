# Approved Decisions

These decisions are authoritative until the user explicitly changes them.

## Repository role

- GitHub is the project Bible and component lab for the CALLBACK / King Prompter project.
- The complete playable game may live in ChatGPT Sites.
- Sites must consult this repository before meaningful product, architecture, gameplay or visual changes.

## Architecture

- Server-authoritative, room-based multiplayer with explicit finite-state lifecycles.
- The server owns membership, stable identity, host permissions, phase, deadlines, round content, submissions, generation jobs, voting/turn eligibility, votes, score ledger, results and history records.
- Clients request actions and render role-specific state projections.
- Commands are schema-validated, phase-valid, permission-checked and safe against retries.
- Reconnect restores stable identity and the current authoritative projection.
- AI, voice/video and media systems are side effects; they do not decide rules.
- Prefer mature patterns/libraries for generic infrastructure and custom code for mode-specific rules.

## Core experience

- Mobile-first room-code joining with a human host.
- Local and Remote Live play are supported where a mode specifies them.
- No audience role in approved scope.
- Primary emotional target: laughter through player creativity.
- Do not reveal submissions before their intended reveal/voting phase.
- Pigeon narration is limited to key moments; essential instructions remain readable.
- Pigeon tease intensity is host-adjustable, harmless and party-safe.
- TV/shared display carries spectacle and audio by default; phones prioritize private actions.

## King Prompter

The full authority is `game-modes/king-prompter/`.

- 3–10 players; 15–20-minute target.
- Tutorial is on by default and the host may skip it.
- Round One and Round Two use shared King's requests and 1–19-word prompts.
- An optional three-choice early-finisher poll chooses Round Two and never blocks play or awards points.
- R2 begins after R1 submissions close without waiting for R1 image generation.
- Players vote on exact-prompt-plus-image pairs; authors are hidden and self-voting is prohibited.
- R1 votes are worth 100 points; R2 votes are worth 150; top ties are co-winners.
- Royal Restoration uses reusable prebuilt torn-section overlays around an immutable central King. Normal square generations are clipped into assigned sections and stitched with visible seams.
- Each active player controls one equal-prominence outer section. Royal Seals are worth 300 points.
- Cumulative high score wins; ties create co-champions.
- Image or narration failure cannot block the match.
- The older theme/style ingredient ballot and Crown Gallery revote remain superseded.

## Royal War Room

- Two team councils compete.
- Players submit hidden rankings across six orders.
- An Attack phase is followed by a guaranteed Defend replay.
- Commanders rotate instead of one player permanently controlling the team.
- Spyglass clues support council discussion.
- Scoring is team-based and server-owned.
- Reconnects restore the player's team, role and current phase.
- Rules and completed matches integrate with History Books.
- Published behavior must not be casually changed from an unverified summary; inspect the live implementation before editing detailed rules.

## Bowl of Fools (working title)

- Team-based, Fishbowl-derived repeated-scroll game for local or Remote Live play.
- Scroll authors are never revealed, including after the match and in History Books.
- The same scroll set is reused for three rounds: Describe; host-selected Drawing or Charades; One Word.
- The host chooses Drawing or Charades in setup.
- Guesses are spoken live; no speech-recognition judgment is required.
- One pass is allowed per performer turn.
- When the bowl empties, the team behind in cumulative points starts the next round.
- A final score tie is settled by one-scroll sudden death.
- Illegal clues use the honor system; the host has an undo control to reverse the affected ruling/point.
- Remote Live may use optional in-game voice. Turning it off supports an outside phone call or another voice channel.
- Remote Live normally transmits only the current performer's camera.
- Every participant controls their own view and may change it on the fly.
- Official turns, scroll order, correct/pass actions, points, phase changes and sudden death are server-authoritative.

## Public History Books

- History Books is a separate public page, not a private personal log.
- Store and organize completed matches with stable IDs, mode, dates, settings, participants, avatars, rounds, prompts, generated images, results, scores, winners and other sensible metadata.
- Provide useful browsing, filtering and individual match detail pages.
- Store public records only after a match reaches an official terminal state; idempotent finalization prevents duplicates.
- Media and metadata are stored separately, with durable references between them.
- Privacy rules from a mode override general archival detail. Bowl of Fools must never expose scroll authors.

## AI / image production

- Cloudflare remains the current production direction.
- Host-facing image choices are Flux.1 Schnell, Flux 2 Fast and Flux 2 Quality profiles.
- Provider/model code stays behind adapters and credentials remain server-side.
- Current game uses an all-ages request pool.
- Technical validation remains required. No additional bespoke semantic submission moderation is part of the confirmed current design; mandatory provider/platform enforcement still applies.
- Self-hosted ComfyUI for future adult-content games is a later possibility, not part of current production.

## Creative direction

- Chaotic medieval castle game show; theatrical pigeon host; crown victory symbol.
- Castle areas may stage different games.
- Palette: navy, cream, crown yellow, coral, cyan and purple.
- Tone: theatrical, playful, absurd and controlled-chaotic, not grim or photorealistic.
- Preserve the opening/menu sequence language: typing, processing, pigeon scene, crown fight, comic explosion and menu reveal/loop.

## Avatars

- Use compact locally reconstructable avatar configuration instead of synchronized image files.
- Avatar Studio v2 is the approved reference prototype.
- Reuse avatar reactions in lobby, waiting, voting, results and victory.
- History Books may display the avatar snapshot/configuration associated with the completed match.

## Removed modes

- Question Cards
- Legacy Quick
- Legacy Extended
