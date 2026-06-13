# 🎨 card-news CLI

[![GitHub](https://img.shields.io/badge/GitHub-wjs--ship--it%2Fcard--news-blue?logo=github)](https://github.com/wjs-ship-it/card-news)
[![npm](https://img.shields.io/badge/npm-card--news-red?logo=npm)](https://www.npmjs.com/package/card-news)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

**Transform news articles into beautiful Instagram card news with AI-powered summarization.**

> A CLI tool that extracts articles from any URL, generates 5-line summaries using Claude AI, and creates stunning Instagram-ready PNG cards (1080x1350px).

## 🌟 Features

- 📰 **Article Extraction** - Parse articles from any URL
- 🤖 **AI Summarization** - Generate concise 5-line summaries using Claude
- 🎨 **Beautiful Cards** - Create 5 Instagram-ready PNG cards
- 🎯 **Customizable** - Magazine name, color, hashtags
- 💾 **Local Storage** - Keep your config safe locally
- ⚡ **Fast** - Generate cards in 6-15 seconds
- 🔧 **CLI-JAW Style** - Use your own API keys (zero hosting cost)

## 🚀 Quick Start

### Installation

```bash
npm install -g card-news
```

### First Time Setup

```bash
card-news init
```

You'll be prompted for:
- Claude API Key (from https://console.anthropic.com/)
- Magazine name
- Primary color (hex code)
- Hashtags

### Generate Card News

```bash
card-news generate https://example.com/article
```

**Output:**
```
📁 card-news-output/
├── 01_cover.png      (Magazine name + Title)
├── 02_content.png    (Main topic)
├── 03_content.png    (Key points)
├── 04_content.png    (Details)
└── 05_end.png        (Call-to-action)
```

### Other Commands

```bash
# View your magazine settings
card-news config

# Test Claude API connection
card-news test

# Show help
card-news --help
```

## 🔧 Configuration

Settings are stored in `~/.card-news/config.json`:

```json
{
  "apiKey": "sk-ant-...",
  "magazineName": "My Magazine",
  "color": "#FF6B6B",
  "hashtags": ["뉴스", "핫이슈"]
}
```

## 📋 Options

### generate command

```bash
card-news generate <url> [options]

Options:
  -o, --output <dir>   Output directory (default: ./card-news-output)
```

Example:

```bash
card-news generate https://example.com/article -o ./my-cards
```

## 🔐 Getting Your Claude API Key

1. Visit https://console.anthropic.com/
2. Create an account or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy your API key
6. Use it in `card-news init`

> 💡 **Tip:** You can also set `CLAUDE_API_KEY` as an environment variable:
> ```bash
> export CLAUDE_API_KEY=sk-ant-...
> ```

## 📖 How It Works

```
URL → Extract Article → AI Summarization → Generate Cards
                ↓            ↓                    ↓
          Get title,      Create 5 lines    Beautiful
          content,      of concise text      PNG images
          metadata         (30 chars)       (1080x1350px)
                             each
```

## 💡 Use Cases

- **Content Creators** - Turn articles into visual posts
- **News Aggregators** - Summarize and showcase articles
- **Social Media** - Quick Instagram content generation
- **Marketing** - Transform blog posts into social graphics
- **Education** - Summarize research and news

## ⚙️ Technical Stack

| Component | Technology |
|-----------|-----------|
| Language | TypeScript 5+ |
| CLI Framework | Commander.js |
| HTML Parsing | Cheerio |
| AI Engine | Claude 3 Opus (Anthropic) |
| Image Generation | Canvas |
| HTTP Requests | Axios |
| CLI Colors | Chalk |

## 🎓 System Requirements

- **Node.js** 18+
- **npm** or **yarn**
- Internet connection
- Claude API key

### Canvas Dependencies

#### macOS
```bash
brew install pkg-config cairo libpng jpeg giflib
```

#### Ubuntu/Debian
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

#### CentOS/RHEL
```bash
sudo yum install gcc-c++ cairo-devel libjpeg-turbo-devel giflib-devel
```

## 📊 Performance

| Metric | Time |
|--------|------|
| CLI startup | <1s |
| Article extraction | 2-5s |
| AI summarization | 3-8s |
| Card generation | 1-2s |
| **Total** | **6-15s** |

## 🐛 Troubleshooting

### "Config not found"
```bash
card-news init
```

### "API connection failed"
- Check your Claude API key is valid
- Ensure you have internet connection
- Verify you have API credits

### "Failed to extract article"
- Try a different article URL
- Some websites may block scraping
- Ensure the URL is accessible

### Canvas build errors
See [Canvas dependencies](#canvas-dependencies) section above.

## 🔮 Roadmap

### Phase 2 (Coming Soon)
- [ ] Multiple card templates
- [ ] ZIP export
- [ ] Batch processing (multiple articles)
- [ ] Advanced customization
- [ ] Preview mode

### Phase 3
- [ ] npm package release
- [ ] Web UI (optional)
- [ ] Instagram API integration
- [ ] Community templates

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙋 FAQ

**Q: Is this free?**
A: The tool is free, but you need a Claude API account. You use your own API key (your cost, not ours).

**Q: Can I use this commercially?**
A: Yes! You can use this for commercial purposes as long as you comply with Claude's terms of service.

**Q: How do I update my settings?**
A: Run `card-news init` again to change your magazine settings.

**Q: Does it work offline?**
A: No, you need internet to extract articles and call the Claude API.

**Q: Can I use a different AI model?**
A: Currently it uses Claude 3 Opus. We may add support for other models in future versions.

## 📞 Support

- **Issues & Bugs:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Feature Requests:** GitHub Issues (with label: feature)

## 🎯 Why card-news?

Unlike web-based alternatives that charge per generation or token:
- ✅ **Zero hosting cost** - You run it locally
- ✅ **Infinite sustainability** - Your own API key
- ✅ **Full customization** - It's open source
- ✅ **Learning value** - High-quality TypeScript code
- ✅ **Portfolio ready** - Impress potential employers

---

**Made with ❤️ for content creators and developers**

[⭐ Star us on GitHub!](https://github.com/wjs-ship-it/card-news)

## 🆕 Phase 2 Features (In Progress)

### ZIP Export
Export all generated cards as a ZIP archive with metadata:

```bash
card-news generate https://example.com --zip
# → card-news-output.zip
```

The ZIP file includes:
- All 5 PNG cards
- metadata.json with generation info

### Upcoming Features
- Multiple card templates (minimal, detailed, colorful)
- Batch processing (multiple articles)
- Advanced customization (fonts, gradients, logos)
- Preview mode

---

## 🔐 Security

We take security seriously:
- ✅ No hardcoded secrets or API keys
- ✅ Input validation for URLs and file paths
- ✅ Protection against directory traversal attacks
- ✅ Sensitive info never exposed in error messages
- ✅ User API keys stored locally only (not our servers)
- ✅ Safe file handling with proper cleanup

See [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md) for details.
