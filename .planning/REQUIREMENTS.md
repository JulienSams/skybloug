# Requirements: Skyblog Nostalgia

**Defined:** 2026-03-02
**Core Value:** The visual experience must feel authentically Skyblog — vibrant customizable backgrounds, the classic layout, and that distinctive early social web energy.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Profile

- [ ] **PROF-01**: User can upload and set profile photo
- [ ] **PROF-02**: User can edit profile display name
- [ ] **PROF-03**: User can edit bio/description text
- [ ] **PROF-04**: User can edit age
- [ ] **PROF-05**: User can edit location

### Article Editor

- [ ] **EDIT-01**: User can create new article with rich text editor
- [ ] **EDIT-02**: User can apply text formatting (bold, italic, underline)
- [ ] **EDIT-03**: User can change text colors
- [ ] **EDIT-04**: User can change fonts
- [ ] **EDIT-05**: User can upload and insert images into article
- [ ] **EDIT-06**: User can embed YouTube videos into article
- [ ] **EDIT-07**: User can save article as draft
- [ ] **EDIT-08**: User can publish article
- [ ] **EDIT-09**: User can add tags to article
- [ ] **EDIT-10**: User can edit existing article (draft or published)
- [ ] **EDIT-11**: User can delete article

### Content Display

- [ ] **DISP-01**: Visitor can view blog homepage with published articles
- [ ] **DISP-02**: Visitor can read full article with formatted content
- [ ] **DISP-03**: Visitor can see article metadata (title, date, tags)
- [ ] **DISP-04**: Visitor can view profile information (photo, name, bio, age, location)
- [ ] **DISP-05**: Blog displays in classic three-column Skyblog layout
- [ ] **DISP-06**: Visitor can filter/browse articles by tag

### Social Features

- [ ] **SOCL-01**: Visitor can post comment on published article
- [ ] **SOCL-02**: Visitor can view all comments on article
- [ ] **SOCL-03**: Comments display with commenter name and timestamp

### Backend & Persistence

- [ ] **BACK-01**: Articles persist in database
- [ ] **BACK-02**: Drafts persist in database
- [ ] **BACK-03**: Profile data persists in database
- [ ] **BACK-04**: Comments persist in database
- [ ] **BACK-05**: Tags persist in database
- [ ] **BACK-06**: Images uploaded by user are stored and accessible

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Customization

- **CUST-01**: User can upload and set custom background image
- **CUST-02**: User can choose from pre-set theme/color options
- **CUST-03**: Background tiles/repeats like classic Skyblog

### Enhanced Social

- **SOCL-04**: Visitor counter tracking and display
- **SOCL-05**: Guestbook feature
- **SOCL-06**: Comment moderation (approve/delete)

### Article Enhancements

- **EDIT-12**: Article categories/folders
- **EDIT-13**: Article scheduling (publish at specific time)
- **EDIT-14**: Article archive view by date

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multiple user blogs | Single-user personal blog only — keeps architecture simple |
| Custom HTML/CSS injection | Security risk and rich text editor provides sufficient formatting |
| Real-time features | Classic blog model with page refreshes matches authentic Skyblog experience |
| Mobile native app | Web-first approach, responsive design sufficient |
| Authentication/login system | Single user app, no multi-tenancy needed for v1 |
| RSS feeds | Not part of original Skyblog core experience |
| Search functionality | Can be added later if content volume demands it |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| TBD | TBD | Pending |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 0
- Unmapped: 33 ⚠️

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-02 after initial definition*
