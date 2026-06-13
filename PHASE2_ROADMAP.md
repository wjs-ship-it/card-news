# 🚀 Phase 2: Advanced Features (2주)

## 완료된 것 (Phase 1 MVP)

✅ **Core Functionality**
- [x] URL → Article extraction (Cheerio)
- [x] Article → 5-line summary (Claude API)
- [x] Summary → 5 PNG cards (Canvas)
- [x] Settings management (~/.card-news/config.json)
- [x] CLI commands (init, generate, config, test)

✅ **Code Quality**
- [x] TypeScript strict mode
- [x] Error handling
- [x] Modular architecture
- [x] CLI-JAW style (user API keys)

---

## Phase 2 Tasks (2주)

### Week 1: Templates & Customization

**1. Multiple Card Templates**
```bash
card-news generate <url> --template minimal
card-news generate <url> --template detailed
card-news generate <url> --template minimal
```

Features:
- [ ] Template system with JSON configs
- [ ] 3+ pre-built templates (minimal, detailed, colorful)
- [ ] Custom template support

**2. Advanced Customization**
```bash
card-news init --interactive
```

Features:
- [ ] Logo/image upload for cover
- [ ] Font customization
- [ ] Padding/margin adjustment
- [ ] Gradient backgrounds

**3. Batch Processing**
```bash
card-news batch urls.json
```

File format:
```json
[
  { "url": "https://...", "output": "card1" },
  { "url": "https://...", "output": "card2" }
]
```

### Week 2: Export & Automation

**4. ZIP Download**
```bash
card-news generate <url> --zip
# → card-news-output.zip (all cards + metadata)
```

**5. Auto Captions & Hashtags**
```bash
# Auto-generated captions.txt
[Card 1]
Title of the article...
#hashtag1 #hashtag2
```

**6. Preview Mode**
```bash
card-news generate <url> --preview
# Opens browser preview before saving
```

---

## Implementation Priority

### High Priority (Must Have)
1. Template system
2. ZIP export
3. Batch processing

### Medium Priority (Nice to Have)
4. Logo upload
5. Advanced customization
6. Preview mode

### Low Priority (Future)
7. Instagram API integration
8. Auto-posting
9. Analytics

---

## Code Structure for Phase 2

```
src/
├── commands/
│   ├── generate.ts (enhanced)
│   ├── batch.ts (new)
│   └── template.ts (new)
├── services/
│   ├── template-engine.ts (new)
│   ├── zip-export.ts (new)
│   └── caption-generator.ts (new)
└── templates/ (directory)
    ├── minimal.json
    ├── detailed.json
    └── colorful.json
```

---

## Next Actions

1. Choose starting point from Phase 2
2. Create feature branches
3. Test each feature thoroughly
4. Document new commands in README

---

## Success Criteria

✅ All Phase 2 features working
✅ 100+ downloads
✅ GitHub stars growing
✅ User feedback positive
