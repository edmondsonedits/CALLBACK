# Avatar System

## Role

Avatars give players persistent visual identity across lobby, waiting, voting, results and victory moments.

The approved prototype is in `components/avatar-studio/`.

## Architecture

Store a compact avatar configuration and reconstruct the character locally. Do not synchronize generated avatar image files unless a future explicit decision changes the architecture.

A player record should conceptually contain:

- stable player ID
- display name
- avatar configuration
- room/game metadata owned elsewhere

Avatar appearance is not player identity.

## Reusable animation vocabulary

The current prototype supports:

- idle
- look left
- look right
- wave
- think
- laugh
- shock
- sad
- cheer
- point
- dance
- victory

Sites may map authoritative game events to these presentation states. Examples:

- waiting → idle/think
- funny reveal → laugh/shock
- round win → cheer
- low/zero result → sad, when appropriate and not punitive
- final winner → victory

Animation is presentation only; it must not change game state.

## Production integration requirements

- Join flow should be able to select/create an avatar.
- Server/player state should carry validated avatar configuration.
- Reconnect should restore the same avatar with the same stable player identity.
- Other clients should reconstruct the avatar from the shared configuration.
- Invalid or unknown avatar values should safely fall back to defaults.
- Schema should be versioned before long-term production use.

## Prototype caveats

The Avatar Studio's fake lobby is only a visualization demo. Its local-storage save behavior is not a multiplayer persistence system and must not be copied as one.
