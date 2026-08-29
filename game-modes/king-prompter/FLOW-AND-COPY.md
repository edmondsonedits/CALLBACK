# King Prompter — Screen Flow and Player Instructions

**Purpose:** exact state order and canonical starter copy for an implementation with no prior game knowledge. Copy may gain additional jokes, but its meaning and order must not change.

## Screen ownership

- **TV/host display:** story, shared request, timers/progress, paintings, reveals, scores and pigeon performance.
- **Phone:** private writing, optional poll, private voting, confirmation and reconnect recovery.
- Never put an essential action only on the TV or an essential rule only in spoken audio.

## Authoritative flow

| # | State | TV | Phone | Exit condition |
|---|---|---|---|---|
| 1 | Tutorial | Pigeon explains gallery and Royal Squires | Six-rule summary / Ready | Tutorial ends or host skips |
| 2 | R1 intro | First King’s request | Request preview | Intro completes |
| 3 | R1 write | Request, timer, anonymous progress | Prompt field and Lock | All resolve or deadline |
| 4 | Early-finisher poll | Pigeon waiting scenes; no totals | Three optional R2 choices | R1 write closes |
| 5 | R2 countdown | 3…2…1 | “Next commission incoming” | Three seconds |
| 6 | R2 write | Poll winner/request, timer | Prompt field and Lock | All resolve or deadline |
| 7 | R1 vote | R1 image cards with prompts | Vote controls | All vote or deadline |
| 8 | R1 reveal | Authors, totals, winner framed | Own points/results | Reveal completes |
| 9 | R2 vote | R2 image cards with prompts | Vote controls | All vote or deadline |
| 10 | R2 reveal | Authors, totals, winner framed | Score update | Reveal completes |
| 11 | R3 intro | Torn royal portrait arrives | Short restoration instructions | Intro completes |
| 12 | R3 write | Damaged portrait, timer/progress | Assigned mask + prompt field | All resolve or deadline |
| 13 | R3 assembly | Pigeon scene and repair progress | Locked/waiting state | Jobs resolve or hard deadline |
| 14 | R3 reveal/vote | Complete collage, then outlined pieces + prompts | Royal Seal vote | All vote or deadline |
| 15 | R3 results | Authors, section totals, Best Restoration | Points earned | Reveal completes |
| 16 | Final | Crown Gallery, scoreboard, champion | Final placement / Play Again | Host action |

## Opening tutorial script

**TV visual:** Empty gold frames in a castle gallery. The pigeon lands at a royal desk. Nervous squires carry canvases and paint.

> “Welcome to the Royal Gallery! His Majesty needs original masterpieces, and competent artists were outside the budget.”
>
> “Each of you has been assigned a highly trained, completely human Royal Squire.”
>
> “When the King requests a picture, write instructions describing exactly what your squire should paint.”

**Visual:** A squire converts a sample instruction card into a strange painting.

> “Your instructions become beautiful, handcrafted, organic artwork—with the traditional number of fingers.”
>
> “Every painting appears beside its instructions. Vote for the creation that best answers the King’s request.”
>
> “Win votes, fill the castle walls and finish with the most points to claim the Crown.”
>
> “The rest of you may leave through the gift shop.”

**Phone tutorial card:**

1. Read the King’s request.
2. Tell your Royal Squire what to paint.
3. Use fewer than 20 words.
4. See each painting beside its instructions.
5. Vote for another player’s creation.
6. Earn the most points and claim the Crown.

Button: **READY TO PAINT**

## Round One screens

### TV request format

> **THE KING REQUESTS:**  
> **[SHORT REQUEST]**

Pigeon adds one short joke that does not narrow the creative task. Example:

> “Nobody remembers what kind of animal it was. Frankly, neither does the King.”

### Phone writing screen

> **[SHORT REQUEST]**  
> Tell your Royal Squire what to paint.  
> Make it memorable. **Fewer than 20 words.**

Elements: live word count, text field, **LOCK INSTRUCTIONS** button, deadline, readable request.

After locking:

> **YOUR SQUIRE IS PAINTING**  
> Your instructions are locked.

Then show the optional poll if the state is still open.

### Optional poll phone copy

> **WHAT SHOULD THE KING REQUEST NEXT?**  
> Vote while the other artists finish. This is optional.

Show exactly three large choices plus **SKIP**. Do not show totals. A player may change selection before closure.

When closed:

> **THE KING HAS DECIDED**  
> [WINNING REQUEST]

If no one voted, the visual may show the pigeon blindly pulling one sealed scroll. This is presentation of server-seeded randomness, not a pigeon gameplay power.

## Round Two transition and writing

TV line when R1 closes:

> “Brushes down! Whatever mistakes remain are now considered artistic choices.”

Show **3…2…1…** and reveal:

> **THE KING’S NEXT REQUEST:**  
> **[POLL WINNER OR GUESSED REQUEST]**

Phone writing structure is identical to Round One. Do not show Round One images yet; they remain hidden until all Round Two prompts resolve.

## Image-voting screen

### TV

- Display one candidate prominently at a time or a legible gallery grid.
- The exact prompt must remain beside the image, not hidden behind a details button.
- Use neutral labels such as Painting 1, Painting 2. Hide names and avatars.

### Phone

> **CHOOSE THE BEST MASTERPIECE**  
> Judge the idea and finished painting together.

Show image thumbnail, exact prompt and select control. Mark own entry **YOUR PAINTING — CANNOT VOTE**.

### Reveal

Reveal author, received votes and points for each entry. Lift the winning painting into a gold frame. For a tie, frame every tied winner.

Suggested pigeon pattern:

> “[Short joke about the winning image.] Into the Crown Gallery it goes.”

## Round Three tutorial and screens

### TV setup

**Visual:** A squire carries in a ripped, stained royal portrait. The King remains intact in the middle; the top and sides are missing.

> “His Majesty has requested one final masterpiece.”
>
> “Unfortunately, this historic portrait was damaged during a completely routine attempt to remove evidence.”
>
> “Each of you will restore one missing section. Our Royal Squires will stitch everything together with accuracy, dignity and whatever glue remains.”

### Phone assignment

Show the full base portrait, dim unassigned regions and strongly highlight the player’s torn section. Allow zooming into the edge context.

> **RESTORE YOUR SECTION**  
> What was beside or behind the King?  
> Add your own funny twist. **Fewer than 20 words.**

Button: **SEND TO SQUIRE**

### Assembly wait

TV may show squires using ladders, paste, crooked frames and unsafe pulleys. Player avatars may help. Phone displays that player’s locked prompt and non-authoritative aggregate progress such as “3 of 5 sections ready.”

### Complete portrait reveal

First show the whole stitched image without voting overlays. Hold long enough for the room to see the combined joke. Pigeon line pattern:

> “The portrait has been restored. History has not.”

Then outline one section at a time and show its exact prompt.

### Royal Seal phone vote

> **AWARD YOUR ROYAL SEAL**  
> Which player contributed the best restored section?

Show the complete portrait plus selectable outlined sections/cards. Disable own section. Do not reveal authors or totals.

### Restoration results

Reveal each author and vote count. Gold-outline every tied highest section and add a **BEST RESTORATION** plaque. Keep the full collage as one central gallery piece.

## Final screen

Show ordered scores and point sources. Highest total receives the Crown. For tied totals, crown every co-champion.

Suggested winner line:

> “[NAME] has impressed the King, defeated the artists and permanently damaged our understanding of history. All hail the new King Prompter!”

Buttons belong to the human host: **PLAY AGAIN**, **CHANGE GAME**, **RETURN TO CASTLE**.

## Copy rules

- Requests: ideally 4–12 words; one sentence maximum.
- Pigeon lines: normally one or two sentences; never delay an input screen to finish a long monologue.
- Do not use pigeon jokes that explain the player’s joke for them.
- Keep buttons literal even when surrounding copy is theatrical.
- Never rely on colour, audio or animation alone for state or instructions.
- Support reduced motion, captions, mute and adjustable teasing without changing game rules.

