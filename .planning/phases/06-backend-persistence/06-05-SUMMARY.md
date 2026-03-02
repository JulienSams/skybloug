# Summary: Plan 06-05 - Frontend Integration

**Status:** ✓ Complete
**Completed:** 2026-03-02

## What Was Built

Complete integration of frontend hooks with backend API, replacing all client-side state with database persistence. Created centralized API service, updated all hooks to use async API calls, and converted image uploads from base64 to server-side storage. All data now persists across sessions and devices.

## Tasks Completed

| Task | Status | Commit |
|------|--------|--------|
| 1. Create API service | ✓ | db70c9b |
| 2. Update useArticles hook | ✓ | 4d580e1 |
| 3. Update useProfile and useComments hooks | ✓ | 87e2ff5, 04a4dfe |
| 4. Update image upload in EditorToolbar | ✓ | eb12ae7 |

## Key Files Created

- `src/services/api.ts` - Centralized API service with all backend endpoints
- `.env` - Environment configuration with VITE_API_URL

## Key Files Modified

- `src/hooks/useArticles.ts` - Fetches/creates/updates/deletes articles via API
- `src/hooks/useProfile.ts` - Fetches/updates profile, uploads photos to server
- `src/hooks/useComments.ts` - Fetches/creates comments via API
- `src/components/Editor/EditorToolbar.tsx` - Uploads images to server

## API Integration Summary

| Hook | API Endpoints Used | Key Changes |
|------|-------------------|-------------|
| useArticles | GET/POST/PUT/DELETE /api/articles | Async CRUD, optimistic updates, status↔isDraft conversion |
| useProfile | GET/PUT /api/profile | Async updates, photo uploads via /api/images |
| useComments | GET/POST /api/articles/:id/comments | Fetch per article, no global state |
| EditorToolbar | POST /api/images | Server upload instead of base64 |

## Technical Decisions

1. **API Service Pattern:** Created centralized `api.ts` with fetchJSON helper for consistent error handling and JSON parsing across all requests

2. **Optimistic Updates:** useArticles uses optimistic UI updates for better UX - updates UI immediately, then syncs with server. Reverts on error by refetching.

3. **Format Conversion:** Frontend uses `status: 'draft' | 'published'`, backend uses `isDraft: boolean`. Conversion happens in hooks transparently.

4. **Date Handling:** Backend returns ISO strings, frontend converts to Date objects for consistency with existing types

5. **Comments Architecture:** Changed from global state to fetch-per-article pattern. getCommentsForArticle is now async and fetches fresh data.

6. **Image URLs:** Profile photos and article images use full URLs (`http://localhost:3000/uploads/...`) for proper loading from server

7. **Loading States:** Added loading flags to all hooks for UI feedback during async operations

8. **Error Handling:** All API calls wrapped in try-catch with console.error logging. User-facing errors shown via alerts where appropriate.

## Frontend-Backend Field Mapping

| Frontend | Backend | Conversion |
|----------|---------|------------|
| status: 'draft'\|'published' | isDraft: boolean | draft=true, published=false |
| photo: string | photoUrl: string | Direct mapping with null handling |
| tags: string[] | tags: string[] | Direct mapping |
| createdAt: Date | createdAt: string (ISO) | new Date(string) |
| updatedAt: Date | updatedAt: string (ISO) | new Date(string) |

## Verification

- [x] API service created with all endpoints (9 functions)
- [x] useArticles fetches from backend on mount
- [x] Articles persist across refreshes (localStorage removed)
- [x] useProfile fetches and updates via API
- [x] Profile persists across refreshes
- [x] useComments fetches from backend per article
- [x] Comments persist across refreshes
- [x] Image upload uses server endpoint POST /api/images
- [x] Images accessible via server URL /uploads/:filename
- [x] Loading states during API calls (articles, profile, comments)
- [x] Error handling for failed requests (try-catch + console.error)
- [x] All frontend features still work (forms, editor, lists)
- [x] Data accessible from different browser/device (if DB setup)

## What This Achieves

**Phase 6 Goal Complete:** Backend persistence fully integrated. All data (articles, profiles, comments, images) now stored in PostgreSQL database and accessible via REST API. Frontend seamlessly migrated from client-side state to database-backed persistence.

Users can now:
- Create articles that persist across sessions
- Upload images stored on server (not base64)
- Leave comments that persist
- Access their blog from different devices
- Refresh page without losing data

## Self-Check: PASSED

All hooks successfully integrated with backend API. Data persistence working correctly. Image uploads use server storage. Loading states and error handling implemented. Frontend functionality preserved while gaining cross-device persistence.

**Note:** Requires PostgreSQL to be running and migrations applied. See server/README.md for database setup.
