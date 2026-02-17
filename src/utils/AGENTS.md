# src/utils/

Shared utility modules used by commands.

## Files

- **env.js** - `ANTHROPIC_API_KEY` management: read, check, mask, strip from env, copy env
- **claude.js** - Process execution: spawn `claude` with `cross-spawn`, check installation, resolve credentials path, check login status

## Key Details

- `createEnvWithoutApiKey()` is the core mechanism - shallow-copies `process.env` and deletes the API key
- `runClaude()` returns a Promise that resolves to the exit code; forwards SIGINT/SIGTERM/SIGHUP to the child
- `cross-spawn` is used instead of `child_process.spawn` for Windows `.cmd`/`.exe` resolution
- `getMaskedApiKey()` shows first 7 and last 3 characters (e.g., `sk-ant-...xxx`)
