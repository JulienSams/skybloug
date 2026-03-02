# Summary 04-01: Blog Homepage with Published Articles

**Phase:** 04-content-display
**Wave:** 1
**Date:** 2026-03-02
**Status:** ✓ Complete

## What Was Built

Built blog homepage that displays real published articles from the useArticles hook, replacing placeholder content with dynamic article list showing titles, previews, metadata, and tags.

### Components Created

**ArticlePreview.tsx** (`src/components/Blog/ArticlePreview.tsx`)
- Displays individual article in Skyblog 2006 aesthetic
- Title with pink underline (#FF1493)
- Date formatted as DD/MM/YYYY à HH:MM
- Preview text: first 200 characters with HTML stripped
- Tags as green clickable links (#00FF00)
- "Lire la suite" link for navigation
- Hover effect on background (#1a1a1a → #222)
- Placeholder kiffs and comments counts
- Entire article preview clickable

**BlogHome.tsx** (`src/components/Blog/BlogHome.tsx`)
- Lists all published articles (filters isDraft === false)
- Sorts by createdAt descending (newest first)
- Maps articles to ArticlePreview components
- Empty state: "Aucun article publié pour le moment."
- Accepts onArticleClick and onTagClick callbacks
- Passes profile prop (for future use)

### Integration

**App.tsx changes:**
- Import BlogHome component
- Replace placeholder blog content with BlogHome
- Pass filteredArticles (or articles) from useArticles
- Add handleSelectArticle placeholder (completed in 04-02)
- Add handleTagClick placeholder (completed in 04-03)
- Maintain profile display in left sidebar

## Requirements Satisfied

- ✓ **DISP-01**: Visitor can view blog homepage with published articles
- ✓ **DISP-03**: Visitor can see article metadata (title, date, tags)
- ✓ **DISP-04**: Visitor can view profile information (photo, name, bio, age, location)

## User Workflow Now Available

1. User opens app → sees blog view with list of published articles
2. Articles sorted newest first
3. Each article shows: title, date, preview (200 chars), tags
4. Draft articles not visible in blog view
5. Empty state shows when no articles published
6. Profile visible in left sidebar
7. Tags and "Lire la suite" prepared for next plans

## Technical Decisions

- **Preview text**: Strip HTML tags, truncate to 200 characters with "..."
- **Date format**: DD/MM/YYYY à HH:MM matching Skyblog style
- **Filtering**: Client-side filter isDraft === false before sort
- **Sorting**: Descending by createdAt (newest first)
- **Placeholder counts**: 18 kiffs, commenter link (data from Phase 5)
- **Click handling**: Entire article clickable, not just "Lire la suite"

## Files Modified

```
src/
├── components/
│   └── Blog/
│       ├── ArticlePreview.tsx (new - 130 lines)
│       └── BlogHome.tsx (new - 45 lines)
└── App.tsx (modified - +6 imports, +2 handlers)
```

## What Works

✓ Blog homepage displays all published articles
✓ Articles sorted newest first
✓ Draft articles excluded from blog view
✓ Article previews show title, date, preview text, tags
✓ Tags displayed in green (#00FF00)
✓ Empty state when no published articles
✓ Profile information visible in left sidebar
✓ Skyblog aesthetic maintained (#FF1493, #1a1a1a, #00FF00, Verdana)
✓ Hover effects on article previews
✓ Clickable articles prepared for navigation (handler added in 04-02)

## Git Commits

- `f114bce` - feat(04-01): implement blog homepage with published articles

## Dependencies

None - Wave 1 plan, no dependencies

## Enables

- 04-02: Article detail view (needs click handler integration)
- 04-03: Tag filtering (needs tag click handling)
