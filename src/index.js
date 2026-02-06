import { Command } from 'commander';
import chalk from 'chalk';
import { loginCommand } from './commands/login.js';
import { apiCommand } from './commands/api.js';
import { statusCommand } from './commands/status.js';

export function run() {
  const program = new Command();

  program
    .name('claude-switcher')
    .alias('cs')
    .description('Switch between Claude Code login mode and API key mode')
    .version('1.0.0');

  program
    .command('login')
    .description('Run Claude in login mode (subscription-based, ignores API key)')
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .action((options, command) => {
      const args = command.args;
      loginCommand(args);
    });

  program
    .command('api')
    .description('Run Claude in API key mode (uses ANTHROPIC_API_KEY)')
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .action((options, command) => {
      const args = command.args;
      apiCommand(args);
    });

  program
    .command('status')
    .description('Show current authentication status')
    .action(() => {
      statusCommand();
    });

  // Default action when no command is provided
  program.action(() => {
    console.log(chalk.cyan('Claude Switcher') + ' - Switch between login and API key modes\n');
    console.log('Usage:');
    console.log(`  ${chalk.green('cs login')} [args...]  Run Claude with subscription (ignores API key)`);
    console.log(`  ${chalk.green('cs api')} [args...]    Run Claude with API key`);
    console.log(`  ${chalk.green('cs status')}          Show current authentication status`);
    console.log('');
    console.log('Examples:');
    console.log(`  ${chalk.gray('cs login')}            Start Claude using your subscription`);
    console.log(`  ${chalk.gray('cs api')}              Start Claude using your API key`);
    console.log(`  ${chalk.gray('cs login -p .')}       Start Claude in current directory (login mode)`);
    console.log('');
    program.help();
  });

  program.parse();
}
