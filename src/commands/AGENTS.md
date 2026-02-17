# src/commands/

CLI command handlers. Each file exports one async command function.

## Pattern

1. Validate preconditions (e.g., API key exists)
2. Print mode indicator with chalk
3. Build environment via `utils/env.js`
4. Call `runClaude(args, env)` from `utils/claude.js`
5. Exit with the child process exit code

## Files

- `login.js` - Strips `ANTHROPIC_API_KEY` from env, spawns Claude (subscription mode)
- `api.js` - Validates API key exists, spawns Claude with key intact
- `status.js` - Read-only; displays CLI install status, API key presence, and mode selection guidance
