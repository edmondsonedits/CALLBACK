# King Prompter — Rules

**Status:** APPROVED SPECIFICATION — NOT YET INTEGRATED IN SITES  
**Approved:** 2026-08-29  
**Target:** 3–10 players, one shared TV/host display and one phone per player  
**Target match length:** 15–20 minutes

This document is authoritative for the approved King Prompter redesign. The current Sites implementation may still use the earlier prompt-ranking flow until a separate integration change is made.

## Design priority

The main source of fun is **players competing through their own creativity**.

AI image generation transforms player ideas but does not judge them. The pigeon is the theatrical presenter and never determines eligibility, votes, scores, finalists or winners.

## Match structure

A match contains:

1. Canvas One
2. Canvas Two
3. The Crown Gallery

Prompt-ranking phases are removed. Players judge the complete creative result during image voting, with the original prompt always visible beside its generated image.

## Canvas One

### Prompt submission

- Every active player writes one visual prompt.
- The existing limit of fewer than 20 words remains unless a later approved decision changes it.
- The normal writing allowance remains up to two minutes; the phase may end early when all eligible players lock.
- Prompts and authorship remain hidden until the appropriate image-voting/reveal phase.
- Image generation begins as early as the authoritative game state allows.

### Optional Canvas Two ingredient

Immediately after locking the Canvas One prompt, a player may submit one optional idea for Canvas Two:

- a subject/theme; or
- a visual art style.

Skipping this suggestion does not affect the player's Canvas One entry or voting eligibility.

### Canvas Two influence ballot

While Canvas One images generate:

- The server creates an anonymous ballot mixing curated built-in ingredients with eligible player suggestions.
- The ballot size scales with active player count.
- A player cannot vote for their own submitted ingredient.
- The top two choices win regardless of category. Two themes, two styles or one of each are all valid.
- If the two winners conflict, combine them and embrace the contradiction rather than correcting it into a safer idea.
- Player authors remain hidden during voting and are credited after results.
- A player whose submitted ingredient wins receives a small fixed bonus.
- Exact ballot-size scaling and bonus value are tunable balance values, not unresolved creative-direction decisions.

### Pigeon presentation

During generation and ingredient voting, the TV pigeon may:

- preview the available choices;
- react to voting progress;
- perform short comedy scenes;
- acknowledge players when they submit;
- interact with player avatars in random harmless moments; and
- spotlight image winners.

The pigeon does not recommend a choice, cast a vote or imply that its preference controls the result.

### Canvas One image vote

- Every eligible generated image or controlled fallback card remains voteable.
- The originating prompt is always displayed beside the image.
- Entries and authorship remain anonymous during voting.
- Players cannot vote for their own entry.
- The server validates rank count, eligibility, duplicates, deadline and self-voting.
- The highest-scoring Canvas One image advances to the Crown Gallery.
- Every image tied for the winning Canvas One position advances.

## Canvas Two

### Combined brief

The two winning influence-ballot ingredients become the required shared direction for Canvas Two.

The game must present both winning ingredients clearly. If their combination is awkward, contradictory or ridiculous, preserve that tension as part of the creative challenge.

### Prompt submission and generation

- Every active player writes a new visual prompt using the shared Canvas Two ingredients.
- The same prompt-length, secrecy, validation and generation-failure rules used for Canvas One apply.
- The pigeon may entertain the room during generation but makes no gameplay decisions.

### Canvas Two image vote

- The original prompt is always displayed beside its generated image.
- Voting remains anonymous and self-voting is prohibited.
- Canvas Two image-vote points are worth **1.5× the equivalent Canvas One image-vote points**.
- The highest-scoring Canvas Two image advances to the Crown Gallery.
- Every image tied for the winning Canvas Two position advances.

## The Crown Gallery

- The Canvas One winner and Canvas Two winner face the final vote.
- If either canvas has tied winners, every tied winning image appears in the Crown Gallery.
- Each finalist keeps its original prompt visible beside the image.
- Players cannot vote for their own finalist.
- The Crown Gallery remains the highest-value competitive moment.
- The room's vote—not AI and not the pigeon—determines the crowned image.
- Overall score ties create co-champions.

## Scoring principles

- Remove all prompt-ranking score events.
- Canvas One image voting establishes the base image-vote values.
- Canvas Two uses 1.5× those values.
- A winning player-created Canvas Two ingredient awards a small fixed bonus.
- The Crown Gallery carries the largest single-round reward.
- Exact numeric values should be tuned through real multiplayer tests while preserving these relative weights.
- Use uniquely keyed, idempotent server-owned score events.

## Pigeon tone and narration

- Pigeon teasing is adjustable by the host.
- The tone must remain harmless and party-safe at every setting.
- Spoken narration is reserved for key moments rather than constant commentary.
- Essential instructions must also appear as readable text.
- Player spotlights may celebrate submissions and wins or create random harmless comedy; they must not shame slow, losing or disconnected players.

## Failure and safety rules

- A failed or late image job must become a controlled voteable fallback rather than blocking the match.
- Missing player suggestions are replaced by curated ingredients.
- AI, media storage or narration failure cannot decide a winner or prevent completion.
- Player prompts and suggestions are untrusted input and require structural validation plus the approved production safety policy.
- Reconnects restore the same identity, submissions, eligibility and consumed actions.

## Superseded behavior

This specification supersedes the earlier King Prompter prompt-ranking phases and any documentation that assumes those phases award points.

It does not modify the live Sites game by itself.
