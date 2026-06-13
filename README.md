# 🎨 card-news CLI

Transform news articles into Instagram card news with AI.

## Features

- 📰 Extract article from any URL
- 🤖 Generate 5-line summary using Claude AI
- 🎨 Create beautiful Instagram card images (1080x1350px)
- 💾 Customizable magazine settings (name, color, hashtags)
- 📥 Save cards as PNG with captions

## Installation

```bash
npm install -g card-news
```

## Quick Start

### 1. Initialize (one-time setup)

```bash
card-news init
```

You'll be prompted to enter:
- Claude API Key (or use `CLAUDE_API_KEY` environment variable)
- Magazine name
- Primary color (hex code)
- Hashtags (comma-separated)

### 2. Generate Card News

```bash
card-news generate https://example.com/article
```

Output:
```
📁 card-news-output/
├── 01_cover.png
├── 02_content.png
├── 03_content.png
├── 04_content.png
├── 05_end.png
└── captions.txt
```

### 3. View Configuration

```bash
card-news config
```

### 4. Test API Connection

```bash
card-news test
```

## Environment Variables

You can set your Claude API key as an environment variable instead of storing it locally:

```bash
export CLAUDE_API_KEY=sk-ant-...
card-news generate https://example.com/article
```

Or create a `.env` file:

```
CLAUDE_API_KEY=sk-ant-...
```

## Options

### generate command

```bash
card-news generate <url> [options]

Options:
  -o, --output <dir>  Output directory (default: ./card-news-output)
```

Example:

```bash
card-news generate https://example.com/article -o ./my-cards
```

## Card Layout

5-card Instagram format optimized for stories and feeds:

1. **Cover Card** - Magazine name + Title
2. **Content Card 1** - Main topic
3. **Content Card 2** - Key points
4. **Content Card 3** - Details
5. **End Card** - Call-to-action + Source

## Configuration File

Settings are stored at `~/.card-news/config.json`:

```json
{
  "apiKey": "sk-ant-...",
  "magazineName": "My Magazine",
  "color": "#FF6B6B",
  "hashtags": ["뉴스", "핫이슈"]
}
```

## Getting Your Claude API Key

1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy and save it securely

## License

MIT
