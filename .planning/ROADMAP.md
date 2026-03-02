# Roadmap: Skyblog Nostalgia

**Created:** 2026-03-02
**Depth:** Standard (5-8 phases)

## Overview

**6 phases** | **33 requirements** | 100% coverage ✓

| # | Phase | Goal | Requirements | Plans |
|---|-------|------|--------------|-------|
| 1 | Foundation & Layout | Establish the authentic Skyblog three-column layout and visual structure | 1 | 0 |
| 2 | Profile Management | Enable user to create and customize their profile identity | 5 | 0 |
| 3 | Article Creation | Build rich text editor with media embedding capabilities | 11 | 0 |
| 4 | Content Display | Render published articles with proper formatting and navigation | 6 | 0 |
| 5 | Social Interaction | Enable visitor commenting on published articles | 3 | 0 |
| 6 | Backend Persistence | Implement API and database for cross-device data persistence | 7 | 0 |

---

## Phase 1: Foundation & Layout

**Goal:** Establish the authentic Skyblog three-column layout and visual structure

**Requirements:**
- DISP-05: Blog displays in classic three-column Skyblog layout

**Success Criteria:**
1. Page renders with three distinct columns: left sidebar (profile), center (content), right sidebar (stats/tags)
2. Layout matches pixel-perfect Skyblog aesthetic from reference images
3. CSS structure supports future customization (backgrounds, colors, fonts)

**Status:** Not started

---

## Phase 2: Profile Management

**Goal:** Enable user to create and customize their profile identity

**Requirements:**
- PROF-01: User can upload and set profile photo
- PROF-02: User can edit profile display name
- PROF-03: User can edit bio/description text
- PROF-04: User can edit age
- PROF-05: User can edit location

**Success Criteria:**
1. User can click profile photo area and upload image file
2. User can edit all profile fields (name, bio, age, location) in dedicated form
3. Profile updates display immediately in left sidebar
4. Profile data persists in component state (backend integration in Phase 6)

**Status:** Not started

---

## Phase 3: Article Creation

**Goal:** Build rich text editor with media embedding capabilities

**Requirements:**
- EDIT-01: User can create new article with rich text editor
- EDIT-02: User can apply text formatting (bold, italic, underline)
- EDIT-03: User can change text colors
- EDIT-04: User can change fonts
- EDIT-05: User can upload and insert images into article
- EDIT-06: User can embed YouTube videos into article
- EDIT-07: User can save article as draft
- EDIT-08: User can publish article
- EDIT-09: User can add tags to article
- EDIT-10: User can edit existing article (draft or published)
- EDIT-11: User can delete article

**Success Criteria:**
1. User can access article editor interface and create formatted text content
2. Editor toolbar provides formatting controls (bold, italic, underline, colors, fonts)
3. User can upload images and embed YouTube videos within article body
4. User can save as draft or publish, with clear status indication
5. User can add multiple tags and see them displayed with article
6. User can access list of articles (drafts + published) and edit or delete any article

**Status:** Not started

---

## Phase 4: Content Display

**Goal:** Render published articles with proper formatting and navigation

**Requirements:**
- DISP-01: Visitor can view blog homepage with published articles
- DISP-02: Visitor can read full article with formatted content
- DISP-03: Visitor can see article metadata (title, date, tags)
- DISP-04: Visitor can view profile information (photo, name, bio, age, location)
- DISP-06: Visitor can filter/browse articles by tag

**Success Criteria:**
1. Blog homepage displays list of published articles with titles and preview
2. Clicking article opens full view with all formatting, images, and embedded videos preserved
3. Article page shows metadata (publish date, tags) and properly rendered content
4. Profile information visible in left sidebar on all pages
5. Clicking tag filters articles to show only posts with that tag

**Status:** Not started

---

## Phase 5: Social Interaction

**Goal:** Enable visitor commenting on published articles

**Requirements:**
- SOCL-01: Visitor can post comment on published article
- SOCL-02: Visitor can view all comments on article
- SOCL-03: Comments display with commenter name and timestamp

**Success Criteria:**
1. Article page displays comment form below article content
2. Visitor can enter name and comment text, then submit
3. All comments for article display in chronological order with name and timestamp
4. New comments appear immediately after submission

**Status:** Not started

---

## Phase 6: Backend Persistence

**Goal:** Implement API and database for cross-device data persistence

**Requirements:**
- BACK-01: Articles persist in database
- BACK-02: Drafts persist in database
- BACK-03: Profile data persists in database
- BACK-04: Comments persist in database
- BACK-05: Tags persist in database
- BACK-06: Images uploaded by user are stored and accessible

**Success Criteria:**
1. Backend API provides endpoints for articles, drafts, profile, comments, tags, and images
2. All data persists in database and survives application restart
3. User can access blog from different device/browser and see all content
4. Images uploaded are stored on server and accessible via stable URLs
5. All frontend features from previous phases continue working with backend integration

**Status:** Not started

---

## Traceability

All 33 v1 requirements mapped to phases.

**Phase 1 (Foundation & Layout):**
- DISP-05

**Phase 2 (Profile Management):**
- PROF-01, PROF-02, PROF-03, PROF-04, PROF-05

**Phase 3 (Article Creation):**
- EDIT-01, EDIT-02, EDIT-03, EDIT-04, EDIT-05, EDIT-06, EDIT-07, EDIT-08, EDIT-09, EDIT-10, EDIT-11

**Phase 4 (Content Display):**
- DISP-01, DISP-02, DISP-03, DISP-04, DISP-06

**Phase 5 (Social Interaction):**
- SOCL-01, SOCL-02, SOCL-03

**Phase 6 (Backend Persistence):**
- BACK-01, BACK-02, BACK-03, BACK-04, BACK-05, BACK-06

**Coverage:** 33/33 requirements mapped ✓

---
*Created: 2026-03-02*
*Last updated: 2026-03-02 after initial creation*
