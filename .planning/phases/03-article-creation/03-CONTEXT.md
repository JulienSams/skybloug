# Phase 3: Article Creation - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Build complete article authoring system with rich text editor, media embedding (images and YouTube), draft/publish workflow, tagging, and article management (list, edit, delete). Backend persistence deferred to Phase 6 — this phase uses component state.

</domain>

<decisions>
## Implementation Decisions

### Rich Text Editor
- **Library choice:** TipTap (built on ProseMirror)
- **Toolbar style:** Classic 2006 Skyblog aesthetic — horizontal toolbar with colorful icon buttons, dropdown menus, bright accent colors (#FF1493 pink, neon greens matching Phase 1-2 styling)
- **Formatting controls:** Extended set including:
  - Bold, Italic, Underline (required)
  - Text Color, Font Family (required)
  - Font Size, Background Color, Lists (bullets/numbers), Links, Alignment (extended)
- **Editor placement:** Replaces center content area (keeps three-column layout, sidebars stay visible)

### Media Embedding
- **Image upload:** Toolbar button opens file picker (matches Phase 2 profile photo pattern)
- **Image storage:** Base64 data URLs embedded in article content (consistent with Phase 2, easy Phase 6 migration)
- **YouTube embed:** Click 'Add Video' button → prompt for YouTube URL → embedded player appears in article
- **No drag-and-drop** for Phase 3 (keep it simple, matches classic blog editors)

### Draft/Publish Flow
- **Save buttons:** Two separate buttons visible in editor: "Save as Draft" and "Publish"
- **Status behavior:** Published articles can be edited (updates stay published, doesn't revert to draft)
- **Tag input:** Text field below editor where user types tag names separated by commas/spaces, displayed as chips

### Article Management UI
- **List style:** Simple vertical list with title, status badge (Draft/Published), date, and Edit/Delete action buttons
- **Navigation:** "Manage Articles" button in right sidebar → replaces center content with article list
- **New article:** "New Article" button at top of article list
- **Delete confirmation:** Dialog asking "Are you sure you want to delete [title]?" with Cancel/Delete buttons (safe, prevents accidents)
- **Edit action:** Clicking Edit loads article content into editor (same center content replacement pattern)

### Claude's Discretion
- Loading skeleton design while editor initializes
- Exact spacing and button sizes for toolbar
- Empty state messaging when article list is empty
- Error handling for image upload failures
- YouTube URL validation and error messages
- Article title input design (separate field vs first line of editor)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **useProfile hook pattern** (src/hooks/useProfile.ts) — Established custom hooks pattern for state management, create similar useArticles hook
- **File upload handling** (useProfile's handlePhotoUpload) — FileReader + base64 conversion pattern already working, reuse for images
- **Inline styling approach** (all components) — Continue using inline styles for TipTap toolbar customization, no CSS modules needed
- **SkyblogLayout component** (src/components/Layout/SkyblogLayout.tsx) — Three-column layout with dynamic content prop, editor and article list slot into content area

### Established Patterns
- **Component state management:** useState for local data, no Redux/Zustand (articles will use state array until Phase 6 backend)
- **Edit mode toggle:** Phase 2 profile uses boolean state to swap between display and edit components — apply same pattern for view/edit/list modes
- **Form handling:** ProfileEdit shows form patterns with save/cancel — replicate for article editor buttons
- **Skyblog 2006 aesthetic:** Dark backgrounds (#1a1a1a), bright accent colors (#FF1493 pink, neon greens), Verdana/Arial fonts, white borders

### Integration Points
- **App.tsx center content:** Currently shows placeholder articles, will switch between article list, editor, and (Phase 4) published view
- **Right sidebar:** Add "Manage Articles" button in info-section alongside existing Info/Tags/Archives sections
- **First external dependency:** TipTap will be first npm package beyond React — acceptable tradeoff for 11 complex requirements

</code_context>

<specifics>
## Specific Ideas

- Toolbar should evoke 2006 Skyblog nostalgia with colorful buttons and dropdowns, not modern minimalism
- Editor experience should feel like classic blog platforms (WordPress, Blogger) from that era
- No autosave for Phase 3 — explicit save actions only (keeps it simple, matches era)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. All requirements (EDIT-01 through EDIT-11) addressed.

</deferred>

---

*Phase: 03-article-creation*
*Context gathered: 2026-03-02*
