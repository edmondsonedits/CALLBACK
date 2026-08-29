# King Prompter — Examples

**Status:** APPROVED REFERENCE EXAMPLES  
These examples demonstrate the approved rules without fixing final balance numbers or content pools.

## Example 1 — Canvas One

Player prompt:

> A royal corgi operating a failing moon cheese factory.

The generated image and this exact prompt appear together on every image-voting card. Voters can reward the player's idea even if the model interprets one detail poorly, or reward a different entry whose prompt and image work better as a pair.

The prompt is not separately ranked before generation.

## Example 2 — Mixed Canvas Two ballot

In a six-player room, the server assembles a ballot from curated choices and eligible player suggestions.

Example anonymous ballot:

- A daycare for nervous dragons — player-submitted theme
- A grand historical painting of a petty argument — curated style
- An underwater royal wedding with no budget — player-submitted theme
- Handmade stop-motion felt — curated style
- A medieval customer-service desk during a crisis — player-submitted theme
- A suspicious 1980s advertisement — curated style

Players see only the choice text during voting. They cannot vote for their own submitted choice.

Suppose the winners are:

1. A daycare for nervous dragons
2. A grand historical painting of a petty argument

Canvas Two combines them into one shared direction:

> Create a visual prompt about a daycare for nervous dragons, presented like a grand historical painting of a petty argument.

After voting, the game reveals which winning choice was player-submitted and credits that player with the approved small fixed bonus.

## Example 3 — Two themes win

Winning choices:

- A castle kitchen during an impossible dinner rush
- Tiny ghosts starting their first job

Both are themes, but they still combine:

> Create a visual prompt about tiny ghosts starting their first job in a castle kitchen during an impossible dinner rush.

The system does not replace one winner merely because no art style won.

## Example 4 — Two styles win

Winning choices:

- Cheap medieval safety manual
- Dramatic stained-glass window

Canvas Two deliberately keeps both:

> Create a visual prompt rendered as a cheap medieval safety manual presented through an excessively dramatic stained-glass window.

The contradiction is part of the comedy.

## Example 5 — Conflicting winners

Winning choices:

- Minimalist black-and-white courtroom sketch
- Overloaded rainbow toy commercial

Do not silently discard or sanitize either winner. Present the collision clearly:

> Create a visual prompt combining a minimalist black-and-white courtroom sketch with an overloaded rainbow toy commercial.

Players compete to make the contradiction usable.

## Example 6 — Pigeon presentation during generation

Allowed television moments:

- The pigeon pulls a lever labelled ART DEPARTMENT and the wrong curtain opens.
- The pigeon previews each ingredient card while castle workers hang them crookedly.
- As votes arrive, the pigeon becomes increasingly overconfident without indicating which choice is leading.
- A submitting player's avatar briefly carries an enormous paintbrush across the stage.
- Two random avatars operate a pulley while the pigeon gives unhelpful instructions.
- The winning image appears and the pigeon attempts to place the crown on it, misses, then corrects itself.

Not allowed:

- The pigeon endorses an ingredient before voting closes.
- The pigeon reveals the current leader.
- The pigeon casts a hidden vote.
- The pigeon mocks a player for submitting slowly, losing, disconnecting or using accessibility settings.

## Example 7 — Tied Canvas winner

If two Canvas One images finish tied for the highest official image-vote score, both advance.

If Canvas Two has one clear winner, the Crown Gallery contains three finalists:

- Canvas One tied winner A
- Canvas One tied winner B
- Canvas Two winner

The tie is visible and celebrated; the server does not silently remove one tied winner to preserve a two-image final.

## Example 8 — Host-adjustable teasing

Possible host-facing tone levels can be implemented without changing game rules:

- Gentle: celebratory reactions and mild production mishaps
- Cheeky: playful self-important remarks and light teasing
- Roast: sharper but still harmless party-safe jokes

The exact labels are implementation copy. Every level must avoid protected traits, appearance-based insults, humiliating personal information and punishment for game performance.

## Example 9 — Generation failure

If an image fails:

- show the original prompt;
- show a controlled concept-card fallback;
- keep the entry eligible;
- allow the room to judge the prompt/fallback combination; and
- continue the same authoritative voting and scoring flow.

The failure never awards or removes points by itself.
