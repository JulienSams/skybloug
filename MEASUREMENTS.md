# Skyblog Layout Measurements & Colors

**Source**: Analysis of three reference images
**Date**: 2026-03-02

## Layout Measurements

### Three-Column Structure

From analyzing the reference images, the classic Skyblog layout follows this structure:

**Total page width**: ~960-1000px (centered container)

**Column widths**:
- Left sidebar (Profile): ~180-200px
- Center content area: ~540-560px
- Right sidebar (Info/Stats): ~180-200px

**Spacing**:
- Gap between columns: ~10-15px
- Page margins: ~20px on each side
- Inner padding: ~10-15px within each column

### Typography

**Font stack**: Verdana, Arial, Helvetica, sans-serif

**Font sizes** (observed):
- Body text: 11-12px
- Blog titles/headings: 14-16px
- Section headers: 12-13px (bold)
- Profile name: 13-14px (bold)
- Tags: 10-11px
- Metadata/timestamps: 10px

**Line height**: 1.4-1.6

## Color Palette

### Image 1 (Johnny Hallyday - Pink Theme)
- **Main background**: #333333 (dark gray)
- **Profile sidebar bg**: #000000 (black)
- **Content area bg**: #FF1493 / #FF69B4 (hot pink / medium pink)
- **Right sidebar bg**: #FF1493 (hot pink)
- **Text on pink**: #FFFFFF (white)
- **Text on dark**: #FFFFFF (white)
- **Borders**: #000000 (black), 1-2px solid
- **Links/tags**: #00FF00 / #7FFF00 (bright greens)
- **Accent**: #00FFFF (cyan)

### Image 2 (Princess - Pink/Black Theme)
- **Background**: #000000 (black)
- **Sidebar**: #000000 with pink accents
- **Content bg**: #FFFFFF (white) with pink borders
- **Pink accent**: #FF1493 (hot pink)
- **Text**: #000000 on white, #FFFFFF on dark
- **Links**: #FF1493 (hot pink)
- **Borders**: #FF1493, bold 2-3px

### Image 3 (Musical Blog - Dark Theme)
- **Main background**: #2B2B2B / #1A1A1A (dark gray/black)
- **Profile sidebar**: #1A1A1A (very dark gray)
- **Content area**: #000000 (black) with light borders
- **Right sidebar**: #1A1A1A
- **Text**: #FFFFFF (white) / #CCCCCC (light gray)
- **Section headers**: #FFFFFF (white)
- **Links**: #0099FF (blue) / #FFFFFF
- **Borders**: #444444 (mid gray), 1px solid
- **Accent buttons**: Pink #FF1493

## Common Patterns

### Borders & Decorations
- Section dividers: 1-2px solid borders
- Profile photo: Often has decorative border or frame
- Content boxes: Subtle borders or background color changes
- No rounded corners (or minimal, 2-3px max)
- No drop shadows (flat 2006 aesthetic)

### Layout Behavior
- Fixed-width centered container
- Desktop-only (no mobile optimization in original)
- Columns maintain fixed widths
- Vertical scrolling for overflow

### Color System Approach
Based on the three images, we should implement:
- CSS custom properties for easy theming
- Default theme using moderate pink/gray combination
- High contrast for readability
- Bold, saturated colors typical of mid-2000s web

## Recommended Implementation Colors

For the default theme, I recommend a balanced approach:

```css
:root {
  /* Main layout */
  --skyblog-bg-body: #2A2A2A;
  --skyblog-bg-sidebar-left: #1A1A1A;
  --skyblog-bg-content: #FFFFFF;
  --skyblog-bg-sidebar-right: #1A1A1A;

  /* Text colors */
  --skyblog-text-primary: #000000;
  --skyblog-text-inverse: #FFFFFF;
  --skyblog-text-muted: #666666;

  /* Accent colors */
  --skyblog-accent-pink: #FF1493;
  --skyblog-accent-green: #00FF00;
  --skyblog-accent-blue: #0099FF;

  /* Borders */
  --skyblog-border-color: #333333;
  --skyblog-border-light: #CCCCCC;

  /* Links */
  --skyblog-link-color: #FF1493;
  --skyblog-link-hover: #FF69B4;
  --skyblog-link-visited: #C71585;
}
```

---
*Measurements extracted from reference images: 1200x680_sc_jony.webp, 5316900.jpg, blog-1024x640.webp*
