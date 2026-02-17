# Claude Switcher

CLI tool that switches between Claude Code **login mode** (subscription) and **API key mode**.

## Quick Reference

- **Language:** JavaScript (ESM modules, `"type": "module"`)
- **Runtime:** Node.js >= 18
- **Entry:** `bin/cs.js` -> `src/index.js`
- **CLI framework:** Commander.js
- **Binary names:** `claude-switcher`, `cs`

## Project Structure

```
bin/cs.js              # CLI entry point
src/
  index.js             # Commander program setup, routes to commands
  commands/
    login.js           # cs login  - run Claude with subscription (strips API key)
    api.js             # cs api    - run Claude with API key
    status.js          # cs status - show auth configuration
  utils/
    env.js             # ANTHROPIC_API_KEY management
    claude.js           # Claude process spawning, install/login checks
```

## Build & Run

```bash
npm install              # Install deps (chalk, commander, cross-spawn)
node bin/cs.js           # Run locally without global install
npm link                 # Install globally as symlink for dev testing
npm test                 # Run tests: node --test test/*.test.js (no tests yet)
```

No build step required - plain JavaScript, no transpilation.

## Development

- Set `ANTHROPIC_API_KEY` in your shell to test `cs api` mode
- `cs login` works without any env vars (it strips the key)
- No test directory exists yet; `npm test` will fail until tests are added

## Key Conventions

- All source files use ESM (`import`/`export`)
- Commands are async functions exported as `{name}Command`
- Commands call `process.exit()` with the claude child process exit code
- Environment manipulation is centralized in `src/utils/env.js`
- Process spawning uses `cross-spawn` for Windows compatibility
- `stdio: 'inherit'` connects child process I/O directly to terminal
- Signal forwarding (SIGINT, SIGTERM, SIGHUP) ensures clean child process shutdown

## Core Mechanism

- **Login mode:** Copies `process.env` without `ANTHROPIC_API_KEY`, spawns `claude` with that env
- **API mode:** Copies `process.env` as-is (API key preserved), spawns `claude`
- All extra CLI args are forwarded to the `claude` subprocess
