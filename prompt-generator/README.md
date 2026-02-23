# AI Prompt Generator
## Create, organize, and reuse prompts

---

## Quick Generate

**Category:** [select] | **Style:** [select] | **Length:** [select]

### Your Prompt:

[Generated prompt appears here]

---

## Saved Prompts

| Name | Category | Usage Count | Last Used |
|------|----------|-------------|-----------|
| Blog Post Outline | Content | 12 | Today |
| Email Writer | Business | 8 | Yesterday |
| Code Review | Tech | 5 | 2 days ago |

---

## Categories

1. **Content Creation** - Blog, social, video
2. **Business** - Email, proposals, reports
3. **Technical** - Code, debugging, architecture
4. **Research** - Analysis, summaries, reports
5. **Personal** - Writing, creative, learning

---

## How to Use

1. Select category
2. Adjust parameters
3. Generate
4. Copy to use

---

## API Endpoint

```
POST /api/prompt/generate
{
  "category": "content",
  "style": "professional",
  "length": "medium",
  "topic": "your topic"
}
```

Returns: Generated prompt string
