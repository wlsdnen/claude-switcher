/**
 * API mode command - runs Claude using ANTHROPIC_API_KEY
 */

import chalk from 'chalk';
import { hasApiKey, getMaskedApiKey, getCurrentEnv } from '../utils/env.js';
import { runClaude } from '../utils/claude.js';

/**
 * Execute Claude in API key mode
 * @param {string[]} args - Arguments to pass to claude
 */
export async function apiCommand(args) {
  // Check if API key is set
  if (!hasApiKey()) {
    console.error(chalk.red('❌ ANTHROPIC_API_KEY is not set.\n'));
    console.log(chalk.yellow('To use API mode, set your API key:\n'));
    console.log(chalk.gray('  # For current session:'));
    console.log(chalk.white('  export ANTHROPIC_API_KEY="your-api-key-here"\n'));
    console.log(chalk.gray('  # To persist (add to your shell config):'));
    console.log(chalk.white('  echo \'export ANTHROPIC_API_KEY="your-api-key"\' >> ~/.zshrc'));
    console.log(chalk.white('  source ~/.zshrc\n'));
    console.log(chalk.gray('Get your API key at: https://console.anthropic.com/\n'));
    process.exit(1);
  }

  const maskedKey = getMaskedApiKey();
  console.log(chalk.green(`🔑 API mode: Using API key (${maskedKey})`));
  console.log('');

  // Run claude with the current environment (API key included)
  const env = getCurrentEnv();
  const exitCode = await runClaude(args, env);
  process.exit(exitCode);
}
