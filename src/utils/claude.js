/**
 * Claude process execution utilities
 */

import spawn from 'cross-spawn';
import chalk from 'chalk';

/**
 * Find the claude command
 * @returns {string} The claude command name
 */
export function getClaudeCommand() {
  // On Windows, we might need 'claude.cmd' or 'claude.exe'
  // cross-spawn handles this automatically when using 'claude'
  return 'claude';
}

/**
 * Run claude with the given arguments and environment
 * @param {string[]} args - Arguments to pass to claude
 * @param {NodeJS.ProcessEnv} env - Environment variables
 * @returns {Promise<number>} Exit code
 */
export function runClaude(args, env) {
  return new Promise((resolve) => {
    const command = getClaudeCommand();

    const child = spawn(command, args, {
      env,
      stdio: 'inherit', // Connect stdin/stdout/stderr to parent process
      shell: false,
    });

    child.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.error(chalk.red('\n❌ Claude CLI not found.'));
        console.error(chalk.yellow('\nPlease install Claude Code first:'));
        console.error(chalk.gray('  npm install -g @anthropic-ai/claude-code'));
        console.error(chalk.gray('  or visit: https://claude.ai/code\n'));
        resolve(1);
      } else {
        console.error(chalk.red(`\n❌ Failed to start Claude: ${err.message}`));
        resolve(1);
      }
    });

    child.on('close', (code) => {
      resolve(code ?? 0);
    });

    // Forward signals to child process
    const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'];
    signals.forEach((signal) => {
      process.on(signal, () => {
        if (!child.killed) {
          child.kill(signal);
        }
      });
    });
  });
}

/**
 * Check if Claude CLI is installed
 * @returns {Promise<boolean>}
 */
export function isClaudeInstalled() {
  return new Promise((resolve) => {
    const command = getClaudeCommand();

    const child = spawn(command, ['--version'], {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    child.on('error', () => {
      resolve(false);
    });

    child.on('close', (code) => {
      resolve(code === 0);
    });
  });
}

/**
 * Get credentials file path based on platform
 * @returns {string}
 */
export function getCredentialsPath() {
  const homeDir = process.env.HOME || process.env.USERPROFILE || '';
  return `${homeDir}/.claude/.credentials.json`;
}

/**
 * Check login status by looking for credentials
 * Note: On macOS, credentials are stored in Keychain, not in .credentials.json
 * @returns {Promise<{installed: boolean, platform: string, note: string}>}
 */
export async function checkLoginStatus() {
  const installed = await isClaudeInstalled();
  const platform = process.platform;

  let note = '';
  if (platform === 'darwin') {
    note = 'Credentials stored in macOS Keychain';
  } else {
    note = `Credentials stored in ~/.claude/.credentials.json`;
  }

  return { installed, platform, note };
}
