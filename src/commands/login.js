/**
 * Login mode command - runs Claude using subscription (ignores API key)
 */

import chalk from 'chalk';
import { createEnvWithoutApiKey, hasApiKey } from '../utils/env.js';
import { runClaude } from '../utils/claude.js';

/**
 * Execute Claude in login mode
 * @param {string[]} args - Arguments to pass to claude
 */
export async function loginCommand(args) {
  // Create environment without API key
  const env = createEnvWithoutApiKey();

  if (hasApiKey()) {
    console.log(chalk.blue('🔐 Login mode: ANTHROPIC_API_KEY will be ignored for this session'));
  } else {
    console.log(chalk.blue('🔐 Login mode: Using subscription authentication'));
  }
  console.log('');

  // Run claude without the API key
  const exitCode = await runClaude(args, env);
  process.exit(exitCode);
}
