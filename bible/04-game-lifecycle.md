# Game Lifecycle

The complete game must progress through explicit server-owned phases. Exact names may evolve, but the underlying principle should remain stable.

## Room setup

Host creates a room, receives a room code and configures approved options. Room exists before the game starts.

## Lobby

Players join, obtain/recover stable identity, choose name/avatar and become ready. The host can see joined-player count. The game cannot silently invent players.

## Round intro

Server announces the round/mode and any special rule needed for that round. Presentation may use castle-room transitions, pigeon-host narration and crown motifs.

## Prompt

Server assigns or reveals the prompt/content required by the mode.

## Submission

Eligible players submit exactly what the mode allows. Submission ownership remains secret when anonymity is required. Do not reveal answers early.

## Reveal

Server determines reveal order and sends the content that may now be shown. Presentation can be theatrical, but reveal order is state-driven.

## Voting

Server determines who may vote for what. Reject duplicate, late or ineligible votes. Client-side buttons are not proof a vote is valid.

## Results

Server calculates the official round result, including ties when applicable. Avatar reactions, pigeon commentary and spectacle happen after the result exists.

## Scoreboard

Server provides official cumulative scores. Later-round weighting must come from explicit rules, not UI math.

## Transition

Server decides whether to start another round, enter the finale or end the game.

## Game over

Official winner is announced and associated with the crown/victory presentation.

## Reconnect behavior

At any phase, a reconnecting player should restore current authoritative room/game state and their stable player identity. They should not be able to repeat already-consumed actions merely because they reloaded.
