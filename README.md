# Claude Switcher

Switch between Claude Code **login mode** (subscription) and **API key mode** easily.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg)](#-platform-support)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen.svg)](#-requirements)

## ❓ The Problem

Claude Code prioritizes `ANTHROPIC_API_KEY` over your subscription login. This means:
- If you have an API key set, Claude **always** uses it (and charges your API account)
- To use your Pro/Max subscription, you must manually unset the environment variable
- Switching between modes is tedious

## ✨ The Solution

`claude-switcher` (or `cs`) lets you choose which mode to use when launching Claude:

```bash
cs login    # Use subscription (ignores API key)
cs api      # Use API key
cs status   # Check current configuration
```

## 🎁 Features

- **🎯 Zero configuration needed** – Works out of the box with existing Claude Code installations
- **⚡ Instant mode switching** – Seamlessly toggle between subscription and API key modes
- **🔐 Secure credential management** – No passwords stored, uses system keychain
- **📝 Clear status information** – Always know which mode you're running in
- **🔄 Seamless Claude integration** – All Claude flags and arguments supported

## 📦 Installation

Install directly from GitHub:

```bash
npm install -g github:wlsdnen/claude-switcher
```

Or using a specific version/tag:

```bash
npm install -g github:wlsdnen/claude-switcher#v1.0.0
```

### Updating

To update to the latest version:

```bash
npm install -g github:wlsdnen/claude-switcher
```

## 🚀 Usage

### Login Mode (Subscription)

Run Claude using your Pro/Max/Team subscription, even if `ANTHROPIC_API_KEY` is set:

```bash
cs login
```

This temporarily removes the `ANTHROPIC_API_KEY` environment variable for the Claude session.

### API Key Mode

Run Claude using your API key:

```bash
cs api
```

Requires `ANTHROPIC_API_KEY` to be set in your environment.

### Check Status

See your current authentication configuration:

```bash
cs status
```

Output example:
```
📊 Claude Switcher Status
────────────────────────────────────────

Claude CLI:
  ✓ Installed
    Credentials stored in macOS Keychain

API Key (ANTHROPIC_API_KEY):
  ✓ Set (sk-ant-...xxx)

────────────────────────────────────────
Mode Selection:
  ⚠  Running claude directly will use API key
     (ANTHROPIC_API_KEY takes priority over subscription)

Usage:
  cs login  → Use subscription (ignores API key)
  cs api    → Use API key
```

### Passing Arguments to Claude

All arguments after the mode are passed directly to Claude:

```bash
# Start Claude in a specific directory
cs login -p ./my-project

# Continue previous session
cs login --continue

# Use with any Claude flags
cs api --model opus
```

## 🔧 How It Works

```
┌─────────────┐     ┌──────────────────────┐     ┌─────────────┐
│ cs login    │ ──▶ │ Remove API key from  │ ──▶ │ claude      │
│             │     │ environment          │     │ (subscription)
└─────────────┘     └──────────────────────┘     └─────────────┘

┌─────────────┐     ┌──────────────────────┐     ┌─────────────┐
│ cs api      │ ──▶ │ Keep API key in      │ ──▶ │ claude      │
│             │     │ environment          │     │ (API)       │
└─────────────┘     └──────────────────────┘     └─────────────┘
```

## ⚙️ Setting Up Your API Key

If you want to use API mode, set your API key:

```bash
# For current session
export ANTHROPIC_API_KEY="your-api-key-here"

# To persist (add to shell config)
echo 'export ANTHROPIC_API_KEY="your-api-key"' >> ~/.zshrc
source ~/.zshrc
```

Get your API key at: https://console.anthropic.com/

## 📋 Requirements

- Node.js 18 or later
- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code`)

## 🌍 Platform Support

- macOS
- Linux
- Windows

## 🔍 Troubleshooting

### Claude CLI not found

Make sure Claude Code is installed:

```bash
npm install -g @anthropic-ai/claude-code
```

### API key not working

1. Check if the key is set: `echo $ANTHROPIC_API_KEY`
2. Verify the key format starts with `sk-ant-`
3. Make sure the key is valid at https://console.anthropic.com/

### Login mode still uses API key

This shouldn't happen, but if it does:

1. Run `cs status` to verify the setup
2. Try running Claude directly without the key: `unset ANTHROPIC_API_KEY && claude`

## 🤝 Contributing

Issues and pull requests are welcome! Feel free to check [issues page](https://github.com/wlsdnen/claude-switcher/issues) if you want to contribute.

Found a bug? Have a feature request? Please [open an issue](https://github.com/wlsdnen/claude-switcher/issues/new).

## 📄 License

MIT

---

**Version:** 1.0.0 | **Status:** Production Ready | **Last Updated:** 2026-02-06
