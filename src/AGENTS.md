# src/

Application source code. ESM modules throughout.

## Architecture

`index.js` sets up the Commander program with three subcommands (`login`, `api`, `status`) and a default help action. Each command is defined in `commands/` and uses shared utilities from `utils/`.

## Conventions

- Export functions, not classes
- Commands are async, named `{name}Command`
- Use `chalk` for all terminal coloring
- No global state - environment is passed explicitly to `runClaude()`
