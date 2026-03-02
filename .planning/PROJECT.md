# Skyblog Nostalgia

## What This Is

A personal blog application that faithfully recreates the iconic mid-2000s Skyblog aesthetic and experience. Single-user React app with backend persistence, featuring the classic three-column layout, customizable backgrounds, and a rich text editor for creating and publishing articles just like the original platform.

## Core Value

The visual experience must feel authentically Skyblog — vibrant customizable backgrounds, the classic layout, and that distinctive early social web energy.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can write articles with rich text formatting (bold, italic, colors, fonts)
- [ ] User can upload and embed images in articles
- [ ] User can embed videos (YouTube) in articles
- [ ] User can save articles as drafts
- [ ] User can publish articles
- [ ] User can tag articles
- [ ] User can upload and set custom background image
- [ ] User can upload and set profile photo
- [ ] User can edit profile name
- [ ] User can edit bio/description
- [ ] User can edit age and location
- [ ] Visitors can view published articles
- [ ] Visitors can comment on published articles
- [ ] Articles and customizations persist across devices via backend

### Out of Scope

- Multiple users creating their own blogs — Single user personal blog only
- Custom HTML/CSS injection — Rich text editor provides sufficient formatting
- Visitor counters — Focused on content and aesthetics first
- Guestbook feature — Comments on posts provide interaction
- Real-time features — Classic blog model with page refreshes
- Mobile app — Web application only

## Context

**Visual Reference:** Three reference images provided showing authentic Skyblog layouts from mid-2000s:
- Pink/purple aesthetic with sidebar profile, center content area, right stats/tags
- Dark theme with Johnny Hallyday fan blog
- Musical blog theme with embedded YouTube videos

**Design Era:** Mid-2000s social blogging platform aesthetic — bold colors, customizable themes, prominent profile presence, tags clouds, archives, social interaction through comments.

**Technical Environment:** Modern React development with backend API for persistence.

## Constraints

- **Tech Stack**: React for frontend — must support rich text editing and image uploads
- **Persistence**: Backend required — user needs access from any device
- **Visual Fidelity**: Pixel-perfect recreation of Skyblog aesthetic — three-column layout, same visual patterns, authentic 2006 vibe
- **Single User**: No multi-tenancy complexity — one blog, one owner

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Backend persistence over LocalStorage | User wants access from multiple devices | — Pending |
| Pixel-perfect 2006 aesthetic over modern redesign | Nostalgia and authenticity are core to the experience | — Pending |
| Rich text editor only (no raw HTML/CSS) | Balances creative freedom with security and maintainability | — Pending |
| Comments enabled | Preserves social aspect of original Skyblog experience | — Pending |

---
*Last updated: 2026-03-02 after initialization*
