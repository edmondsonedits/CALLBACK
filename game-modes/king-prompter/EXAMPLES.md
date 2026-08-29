# King Prompter — Rule Examples and Edge Cases

Use `PLAYTHROUGH.md` for one complete match. These shorter examples remove ambiguity from individual rules.

## Shared request, varied answers

King’s request:

> **A portrait of the King’s mysterious childhood pet.**

Valid player prompts can differ completely:

- A fat squirrel sitting on a pile of candy wrappers and junk food.
- A tiny dragon wearing knitted booties, sleeping inside the King’s crown.
- An elderly goldfish commanding a toy navy from an elaborate crystal bowl.
- Three raccoons in a robe pretending to be one sophisticated royal hound.

The request supplies a common comparison; it does not dictate the joke.

## Prompt length

- Nineteen words: accepted if otherwise valid.
- Twenty words: rejected with a private “Use fewer than 20 words” message.
- Client and server use the same visible count when possible, but the server count is official.

## Optional poll

Choices receive 2, 1 and 0 votes: the 2-vote choice wins.

Choices A and B each finish with 2 votes. A reached 2 accepted votes at 20:15:04; B reached 2 at 20:15:07. A wins. Submission speed and prompt-lock speed are irrelevant.

All choices receive 0 votes: the server guesses one choice using room-seeded randomness. The TV may animate the pigeon pulling a sealed scroll, but the pigeon did not make an authoritative decision.

## Prompt and image judged together

During voting, a card always contains both:

> **Prompt:** The King rescuing a village by accidentally falling onto the attacking dragon.

and its resulting image. If the image misses a detail, the room decides whether the underlying idea still deserves the vote. The system does not separately rank prompts or automatically compensate the author.

## Round winner tie

Two Round One paintings each receive three votes, more than every other entry. Both earn 300 points and both are framed in the Crown Gallery. There is no hidden tie-breaker.

## Restoration at different player counts

- 3 players: load the reviewed 3-mask portrait and assign one mask each.
- 6 players: load the reviewed 6-mask portrait and assign one mask each.
- 10 players: load the reviewed 10-mask portrait and assign one mask each.

Do not take a 10-mask template and leave random holes for a 6-player room. Every supported count has a complete, balanced layout.

## Restoration mismatch

One player paints a realistic bear, another creates a flat cartoon Queen and a third creates a glowing fantasy portal. Keep those differences. Clip each patch to its torn mask, preserve the central King and apply the common seam overlay. Do not harmonize every section into one style; visual disagreement is the finale’s payoff.

## Restoration vote tie

Two sections each receive two Royal Seals. Both authors receive 600 points and both sections receive Best Restoration highlighting. The complete portrait is still framed only once.

## Overall score tie

Two players finish at 750. Both receive crowns/co-champion treatment. Do not break the tie with submission speed, poll participation, model quality, pigeon preference or randomness.

## Generation failure

For Round One/Two, show a controlled concept-card fallback containing the exact prompt and keep it voteable.

For Restoration, fill the assigned mask with a deliberate parchment repair/fallback, preserve its prompt as the voteable contribution and complete the collage. The failure itself neither awards nor removes points.

## Safe pigeon behavior

Allowed:

- Pigeon struggles to hang an oversized frame.
- Avatar carries an enormous paintbrush after locking.
- Pigeon jokes that the King’s records were lost in a convenient fire.
- Pigeon reacts to “three of five artists finished” without identifying slow players.

Not allowed:

- Revealing the poll or vote leader.
- Endorsing an entry before voting closes.
- Mocking a named player for being slow, losing, disconnecting or using accessibility settings.
- Casting a vote or selecting a winner.

