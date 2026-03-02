# Summary: Plan 06-02 - Articles API

**Status:** ✓ Complete
**Completed:** 2026-03-02

## What Was Built

Implemented complete RESTful API for articles with full CRUD operations, draft filtering, and automatic tag management. API endpoints handle article creation, retrieval, updates, and deletion with proper error handling and response formatting.

## Tasks Completed

| Task | Status | Commit |
|------|--------|--------|
| 1. Create article controller | ✓ | 3c260d4 |
| 2. Create articles router | ✓ | 844f5f8 |
| 3. Integrate router into server | ✓ | b8c40eb |

## Key Files Created

- `server/src/controllers/articleController.ts` - Five controller functions (create, getAll, getOne, update, delete)
- `server/src/routes/articles.ts` - Express router with RESTful endpoints

## Key Files Modified

- `server/src/index.ts` - Mounted articles router at /api prefix

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/articles | Create article with tags |
| GET | /api/articles | List all articles (optional ?draft=true filter) |
| GET | /api/articles/:id | Get single article with comments |
| PUT | /api/articles/:id | Update article and reconnect tags |
| DELETE | /api/articles/:id | Delete article (cascade to tags/comments) |

## Technical Decisions

1. **Tag Management:** Used Prisma's `connectOrCreate` pattern to automatically create tags if they don't exist or connect existing ones by name

2. **Response Formatting:** Flattened tag structure - returning string array instead of full relation objects for cleaner frontend consumption

3. **Draft Filtering:** Query parameter `?draft=true` filters articles by isDraft status

4. **Comment Counts:** Included `_count.comments` in list view for displaying comment counts without loading full comment data

5. **Error Handling:** All endpoints have try-catch blocks with appropriate HTTP status codes (400, 404, 500)

6. **Cascade Deletes:** ArticleTag and Comment records automatically deleted when article is removed (configured in Prisma schema)

## Request/Response Examples

**Create Article:**
```json
POST /api/articles
{
  "title": "Mon premier article",
  "content": "<p>Hello world</p>",
  "isDraft": false,
  "tags": ["skyblog", "2006"]
}
```

**Get Articles:**
```json
GET /api/articles?draft=false
[
  {
    "id": "uuid",
    "title": "...",
    "content": "...",
    "isDraft": false,
    "tags": ["skyblog", "2006"],
    "commentCount": 3,
    "createdAt": "2026-03-02T...",
    "updatedAt": "2026-03-02T..."
  }
]
```

## Verification

- [x] Article controller has all CRUD methods
- [x] Tags created/connected automatically via connectOrCreate
- [x] POST /api/articles creates article with tags
- [x] GET /api/articles returns all articles with comment counts
- [x] GET /api/articles?draft=true filters drafts
- [x] GET /api/articles/:id returns single article with comments
- [x] PUT /api/articles/:id updates article and reconnects tags
- [x] DELETE /api/articles/:id removes article (cascade deletes)
- [x] 404 returned for non-existent articles
- [x] Articles include tags in simplified array format
- [x] Articles ordered by createdAt desc (newest first)

## What This Enables

Frontend can now persist articles to database instead of component state. Ready for Plan 06-05 frontend integration.

## Self-Check: PASSED

All API endpoints implemented with proper validation, error handling, and response formatting. Tag management works automatically. Ready for integration.
