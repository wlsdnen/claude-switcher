/**
 * Environment variable utilities for managing ANTHROPIC_API_KEY
 */

const API_KEY_ENV = 'ANTHROPIC_API_KEY';

/**
 * Get the current ANTHROPIC_API_KEY value
 * @returns {string|undefined} The API key or undefined if not set
 */
export function getApiKey() {
  return process.env[API_KEY_ENV];
}

/**
 * Check if ANTHROPIC_API_KEY is set
 * @returns {boolean}
 */
export function hasApiKey() {
  const key = getApiKey();
  return key !== undefined && key !== '';
}

/**
 * Get masked version of API key for display
 * @returns {string|null} Masked key like "sk-ant-...xxx" or null if not set
 */
export function getMaskedApiKey() {
  const key = getApiKey();
  if (!key) return null;

  if (key.length <= 10) {
    return '***';
  }

  const prefix = key.slice(0, 7);
  const suffix = key.slice(-3);
  return `${prefix}...${suffix}`;
}

/**
 * Create a copy of process.env without ANTHROPIC_API_KEY
 * This allows running claude in login mode even when API key is set
 * @returns {NodeJS.ProcessEnv} Environment object without API key
 */
export function createEnvWithoutApiKey() {
  const env = { ...process.env };
  delete env[API_KEY_ENV];
  return env;
}

/**
 * Get the current environment (with API key intact)
 * @returns {NodeJS.ProcessEnv}
 */
export function getCurrentEnv() {
  return { ...process.env };
}
