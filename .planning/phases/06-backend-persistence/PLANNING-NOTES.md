# Phase 6: Backend Persistence - Planning Notes

**Status:** Needs user input for technology stack decisions
**Date:** 2026-03-02

## Overview

Phase 6 will add backend API and database to persist all data (articles, profiles, comments, images) across devices and sessions.

## Current State

All frontend features complete (Phases 1-5):
- ✓ Skyblog layout and aesthetic
- ✓ Profile management
- ✓ Article creation with TipTap editor
- ✓ Content display and navigation
- ✓ Commenting system

All data currently in component state (lost on refresh).

## Requirements (6 total)

- **BACK-01**: Articles persist in database
- **BACK-02**: Drafts persist in database
- **BACK-03**: Profile data persists in database
- **BACK-04**: Comments persist in database
- **BACK-05**: Tags persist in database
- **BACK-06**: Images uploaded stored and accessible

## Technology Decisions Needed

### Backend Framework
Options:
- Node.js + Express (JavaScript continuity)
- Python + FastAPI (modern, fast)
- Go + Gin (performance)

### Database
Options:
- PostgreSQL (relational, full-featured)
- MongoDB (document-based, flexible)
- SQLite (simple, file-based)

### Image Storage
Options:
- Local filesystem
- AWS S3
- Cloudinary

### Deployment
Options:
- Docker containers
- Vercel/Netlify (frontend) + Railway/Render (backend)
- VPS (full control)

## Recommended Approach

Given project is React + TypeScript frontend:

**Option A: Node.js Full Stack**
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- Images: Local filesystem initially
- ORM: Prisma or TypeORM
- Benefits: Same language, easy integration

**Option B: Python Backend**
- Backend: Python + FastAPI
- Database: PostgreSQL
- Images: Local filesystem
- ORM: SQLAlchemy
- Benefits: Modern async API, great docs

## Suggested Plan Structure

### Plan 06-01: Database Schema & Models
- Design schema for articles, profiles, comments
- Set up database connection
- Create models/entities

### Plan 06-02: API Endpoints - Articles
- POST /api/articles (create)
- GET /api/articles (list)
- GET /api/articles/:id (get one)
- PUT /api/articles/:id (update)
- DELETE /api/articles/:id (delete)
- GET /api/articles?draft=true (list drafts)

### Plan 06-03: API Endpoints - Profile & Comments
- GET/PUT /api/profile
- POST /api/articles/:id/comments
- GET /api/articles/:id/comments

### Plan 06-04: Image Upload & Storage
- POST /api/images (upload)
- Serve images via API
- Update TipTap image handling

### Plan 06-05: Frontend Integration
- Create API client service
- Update hooks (useArticles, useProfile, useComments)
- Replace local state with API calls
- Add loading states
- Error handling

## Next Steps

1. User decides on technology stack
2. Run `/gsd:discuss-phase 6` to gather context
3. Create detailed plans based on chosen stack
4. Consider splitting into multiple decimal phases if complex

## Estimated Complexity

- **High** - Backend development, database design, deployment
- **Multiple waves** - Schema, API, integration, testing
- **Dependencies** - Backend must be running for frontend to work
- **Time estimate** - Significant (2-4x previous phases)

---

*Notes created: 2026-03-02*
*Context: 83% usage, recommending user discussion before detailed planning*
