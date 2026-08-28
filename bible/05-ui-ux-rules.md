# UI / UX Rules

## Mobile first

Primary player interaction is on phones. Controls must fit small screens, use large touch targets and avoid requiring precision taps.

## Host vs player screens

Treat host/display and player-phone responsibilities separately. The shared display can carry spectacle and context; phones should prioritize the action each player needs to take now.

## State clarity

At every moment the player should understand:

- what phase they are in
- what they need to do
- whether their action was accepted
- whether they are waiting for others

Avoid exposing internal technical state or unnecessary settings during play.

## Submission secrecy

Do not reveal submitted answers before the intended reveal/voting phase.

## Waiting

Waiting states should feel intentional. Use avatar reactions, pigeon-host behavior, lightweight fidgets or game-show presentation where appropriate, without changing official game rules.

## Joining

Room code is the central join mechanism. Player count should be visible to the host/lobby. Name/avatar selection should feel like part of joining rather than a separate disconnected product.

## Accessibility

- Maintain strong contrast.
- Respect reduced-motion preferences where practical.
- Provide keyboard/focus accessibility for web controls.
- Do not encode essential status only by color.
- Use readable text sizes on phones.

## Visual consistency

UI should feel like a coherent castle game show, not a set of unrelated mini-apps. Reuse recurring materials, shapes, crown/pigeon motifs and approved palette.

## Simplicity rule

If a player needs an explanation to understand a basic button or phase, simplify the interface before adding more instructional text.
