/**
 * Status command - shows current authentication status
 */

import chalk from 'chalk';
import { hasApiKey, getMaskedApiKey } from '../utils/env.js';
import { checkLoginStatus } from '../utils/claude.js';

/**
 * Display current authentication status
 */
export async function statusCommand() {
  console.log(chalk.cyan.bold('\n📊 Claude Switcher Status'));
  console.log(chalk.gray('─'.repeat(40)));

  // Check Claude CLI installation
  const loginStatus = await checkLoginStatus();

  console.log('');
  console.log(chalk.bold('Claude CLI:'));
  if (loginStatus.installed) {
    console.log(`  ${chalk.green('✓')} Installed`);
    console.log(`  ${chalk.gray(`  ${loginStatus.note}`)}`);
  } else {
    console.log(`  ${chalk.red('✗')} Not installed`);
    console.log(`  ${chalk.gray('  Install: npm install -g @anthropic-ai/claude-code')}`);
  }

  // Check API key
  const apiKeySet = hasApiKey();
  const maskedKey = getMaskedApiKey();

  console.log('');
  console.log(chalk.bold('API Key (ANTHROPIC_API_KEY):'));
  if (apiKeySet) {
    console.log(`  ${chalk.green('✓')} Set (${chalk.gray(maskedKey)})`);
  } else {
    console.log(`  ${chalk.yellow('○')} Not set`);
  }

  // Show which mode will be used
  console.log('');
  console.log(chalk.gray('─'.repeat(40)));
  console.log(chalk.bold('Mode Selection:'));

  if (apiKeySet) {
    console.log(`  ${chalk.yellow('⚠')}  Running ${chalk.white('claude')} directly will use ${chalk.green('API key')}`);
    console.log(`     ${chalk.gray('(ANTHROPIC_API_KEY takes priority over subscription)')}`);
    console.log('');
    console.log(chalk.bold('Usage:'));
    console.log(`  ${chalk.cyan('cs login')}  → Use subscription (ignores API key)`);
    console.log(`  ${chalk.cyan('cs api')}    → Use API key`);
  } else {
    console.log(`  ${chalk.green('✓')} Running ${chalk.white('claude')} will use ${chalk.blue('subscription')}`);
    console.log('');
    console.log(chalk.bold('Usage:'));
    console.log(`  ${chalk.cyan('cs login')}  → Use subscription`);
    console.log(`  ${chalk.cyan('cs api')}    → ${chalk.gray('(Requires ANTHROPIC_API_KEY to be set)')}`);
  }

  console.log('');
}
