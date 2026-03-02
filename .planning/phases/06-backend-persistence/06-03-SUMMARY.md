# Summary: Plan 06-03 - Profile & Comments API

**Status:** ✓ Complete
**Completed:** 2026-03-02

## What Was Built

Implemented RESTful API endpoints for single-user profile management and article comment system. Profile API handles get/update operations with automatic default creation. Comments API provides nested routes under articles for creating and retrieving comments chronologically.

## Tasks Completed

| Task | Status | Commit |
|------|--------|--------|
| 1. Create profile controller and router | ✓ | f5bc07b |
| 2. Create comments controller and router | ✓ | f59d3d7 |
| 3. Integrate routers into server | ✓ | 85028fe |

## Key Files Created

- `server/src/controllers/profileController.ts` - Profile get/update with upsert pattern
- `server/src/routes/profile.ts` - Profile router (GET, PUT)
- `server/src/controllers/commentController.ts` - Comments get/create with article validation
- `server/src/routes/comments.ts` - Comments router (nested under articles)

## Key Files Modified

- `server/src/index.ts` - Mounted profile and comments routers

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get profile (creates default if missing) |
| PUT | /api/profile | Update profile data |
| GET | /api/articles/:articleId/comments | List comments for article |
| POST | /api/articles/:articleId/comments | Create comment on article |

## Technical Decisions

1. **Single-User Profile:** Used `findFirst()` + upsert pattern since only one profile exists. getProfile creates default profile ("Mon Skyblog") if database is empty

2. **Profile Upsert:** updateProfile uses Prisma's upsert operation to handle both create and update scenarios without separate logic

3. **Comment Ordering:** Comments ordered by `createdAt ASC` (oldest first) for chronological conversation flow

4. **Article Validation:** createComment verifies article exists before creating comment, returns 404 if article not found

5. **Nested Routes:** Comments use RESTful nested resource pattern (`/articles/:articleId/comments`) since they're always associated with an article

6. **Optional Fields:** Profile fields (bio, age, location, photoUrl) are nullable - only name is required with sensible default

## Request/Response Examples

**Get Profile:**
```json
GET /api/profile
{
  "id": "uuid",
  "name": "Mon Skyblog",
  "bio": "Bienvenue sur mon skyblog!",
  "age": 16,
  "location": "Paris",
  "photoUrl": "...",
  "createdAt": "2026-03-02T...",
  "updatedAt": "2026-03-02T..."
}
```

**Create Comment:**
```json
POST /api/articles/:articleId/comments
{
  "authorName": "Visiteur123",
  "content": "Super article!"
}

Response (201):
{
  "id": "uuid",
  "articleId": "...",
  "authorName": "Visiteur123",
  "content": "Super article!",
  "createdAt": "2026-03-02T..."
}
```

## Verification

- [x] Profile controller has get and update methods
- [x] GET /api/profile returns profile (creates default if missing)
- [x] PUT /api/profile updates profile data with upsert
- [x] Profile data persists across requests
- [x] Comments controller has get and create methods
- [x] GET /api/articles/:id/comments returns all comments for article
- [x] Comments ordered chronologically (oldest first, ASC)
- [x] POST /api/articles/:id/comments creates comment
- [x] Comment validates article exists (404 if not found)
- [x] Created comment returned with id and timestamp (201)
- [x] Comments persist in database

## What This Enables

Wave 2 complete! Profile and comments APIs ready. Next: Wave 3 (Plan 06-04 Image Upload) and Wave 4 (Plan 06-05 Frontend Integration).

## Self-Check: PASSED

All profile and comment endpoints implemented with proper validation and error handling. Single-user profile pattern works correctly. Comments API follows RESTful nested resource conventions.
