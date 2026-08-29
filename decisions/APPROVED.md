# Approved Decisions

These decisions are authoritative until the user explicitly changes them.

## Repository role

- GitHub is the project Bible and component lab for CALLBACK / King Prompter.
- The complete playable game may live in ChatGPT Sites.
- Sites must consult this repository before meaningful product, architecture, gameplay or visual changes.

## Architecture

- Server-authoritative, room-based multiplayer with an explicit finite-state lifecycle.
- The server owns membership, stable identity, phase, deadlines, requests, prompts, generation jobs, voting eligibility, votes, score ledger and results.
- Clients request actions and render snapshots; presentation cannot decide official state.
- Prefer mature libraries/patterns for generic infrastructure and custom code for CALLBACK-specific gameplay.

## Core experience

- Mobile-first room-code joining with a human host.
- No audience mode in the approved scope.
- Primary emotional target: laughter through player creativity.
- Do not reveal submissions before their intended voting/reveal phase.
- Later rounds matter more.
- Pigeon narration is limited to key moments; essential instructions are readable.
- Pigeon tease intensity is host-adjustable but always harmless and party-safe.

## King Prompter

The full authority is `game-modes/king-prompter/`.

- 3–10 players; 15–20-minute target.
- Fiction: the King commissions artwork; each player instructs a supposedly human Royal Squire; the pigeon hosts a chaotic medieval/Renaissance gallery show.
- First-time tutorial lasts roughly 30–45 seconds and is skippable for returning players.
- Every normal round begins with one clear shared King’s request. Prompts contain 1–19 words.
- No prompt-ranking phase.
- Round One generation starts per locked entry.
- Early finishers may optionally vote among exactly three curated requests for Round Two. This poll never blocks play or awards points.
- Poll ties with votes go to the choice that reached its final tied total first. With zero votes, the server guesses using fair room-seeded randomness.
- Round Two begins after a three-second countdown as soon as Round One submissions close; do not wait for Round One generation.
- After Round Two submissions, vote Round One, then Round Two. Always show the exact prompt beside its image; hide authors; prohibit self-voting.
- Round One awards 100 points per received vote. Round Two awards 150.
- Every top-vote tie is a co-winner and all tied paintings enter the Crown Gallery.
- Round Three restores one torn royal portrait. The central King remains immutable; each active player prompts one equal-prominence missing outer section; patches are independently generated, clipped and stitched together with visible seams.
- The complete badly mismatched collage is the intended shared finale and becomes the central gallery art.
- Players award one Royal Seal to another section. Each seal is worth 300 points. Top tied sections share Best Restoration.
- Cumulative high score wins the Crown; overall ties create co-champions.
- The pigeon is presentation only and never judges, votes, scores, selects poll results or breaks ties.
- Failed images/patches receive controlled voteable fallbacks; generation and narration failure cannot block the match.
- The older theme/style suggestion ballot, top-two combination, ingredient bonus and Crown Gallery revote are superseded.

## Creative direction

- Chaotic medieval castle game show.
- Pigeon host/mascot and crown victory symbol.
- Castle areas may stage different games.
- Palette direction: navy, cream, crown yellow, coral, cyan and purple.
- Tone: theatrical, playful, absurd and controlled-chaotic rather than grim or realistic.
- Preserve the opening/menu language: typing, processing, pigeon scene, crown fight, comic explosion, menu reveal/loop.

## Avatars

- Use compact locally reconstructable avatar configuration rather than synchronized image files.
- Avatar Studio v2 is an approved reference prototype.
- Reuse avatar reactions for lobby, waiting, voting, results and victory where appropriate.

## Removed modes

- Question Cards
- Legacy Quick
- Legacy Extended

