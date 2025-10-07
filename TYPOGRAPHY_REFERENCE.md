# FIQuest Typography Reference

**Date**: October 6, 2025
**Theme**: Simplified Type System for Dark Mode

## Overview

FIQuest uses a streamlined, single-font typography system optimized for readability on dark backgrounds. The system follows modern design best practices with minimal size and weight variations for visual consistency.

---

## Font Family

**Primary Font Stack**: `'Helvetica Neue', Arial, sans-serif`

- Applied universally to all text elements
- System fonts provide consistent cross-platform rendering
- No custom web fonts = faster page load times
- Professional, neutral appearance suitable for financial applications

---

## Font Size Scale

**5 sizes total** (reduced from 8 for improved consistency)

| Size | Usage | Elements |
|------|-------|----------|
| **28px** | Page titles | Main page headings (`.page-title`) |
| **20px** | Section headers | Container section titles (`.section-title`, `.app-title`) |
| **16px** | Default/body text | Navigation links, labels, form inputs, data values, subsection headers |
| **14px** | Secondary text | Table headers, user info, disclaimer text |
| **12px** | Tertiary/labels | Tooltip text, small captions, result card labels, toggle arrows |

### Size Application Guidelines

- **28px**: Used sparingly for page-level hierarchy only
- **20px**: Major section divisions and primary navigation branding
- **16px**: Primary workhorse size - use for most interactive elements
- **14px**: Supporting information that needs to be readable but subordinate
- **12px**: Fine print, icons, UI affordances

---

## Font Weight Scale

**3 weights total** (reduced from 5 for clearer hierarchy)

| Weight | Value | Usage | Elements |
|--------|-------|-------|----------|
| **Normal** | 400 | Default text, page titles, subtitles | Body text, `.page-title`, `.page-subtitle` |
| **Semi-Bold** | 600 | Emphasis, labels, navigation | Labels, `.app-title`, table headers, `.chart-title`, inline headers |
| **Bold** | 700 | Strong emphasis, active states | Active nav items, section titles, status indicators, key values |

### Weight Application Guidelines

- **400 (Normal)**: Default for all text unless emphasis is needed
- **600 (Semi-Bold)**: Use for labels, input text, and navigation elements that need subtle emphasis
- **700 (Bold)**: Reserved for active states, section headers, and critical data points

---

## Typography Best Practices Applied

Based on research from Learn UI Design and Material Design 3:

### ✅ What We Do

1. **Single font family** throughout the application
2. **Limited size scale** (5 sizes vs. industry recommendation of 4-5)
3. **Minimal weight variations** (3 weights vs. Material Design's 3-4)
4. **16px minimum** for form inputs (prevents iOS zoom)
5. **Consistent hierarchy** through systematic size/weight pairing
6. **Optimized for interaction-heavy pages** (14-20px default range)

### Design System Rationale

| Element Type | Recommended Range | FIQuest Implementation | Rationale |
|--------------|-------------------|------------------------|-----------|
| Page Title | 30-50px (desktop) | 28px | Interaction-heavy app, mobile-first |
| Default Text | 14-20px (interaction-heavy) | 16px | Optimal for data display & forms |
| Secondary Text | -2px from default | 14px | Standard offset from 16px |
| Font Sizes Total | 4 sizes | 5 sizes | Slight expansion for table/label needs |
| Font Weights | 3-4 weights | 3 weights | Minimum for clear hierarchy |

---

## Dark Mode Optimization

### Text Color Palette (from COLOR_REFERENCE.md)

- **Primary Text**: `#ffffff` - Main headings, labels (highest contrast)
- **Secondary Text**: `#e0e0e0` - Body text, descriptions
- **Muted Text**: `#b0b0b0` - Subtle text, placeholders

### Contrast Ratios

All text meets WCAG AA standards for dark backgrounds:
- White (#ffffff) on dark grey (#222222): ~15.8:1 ✅
- Light grey (#e0e0e0) on dark grey (#222222): ~13.1:1 ✅
- Muted text (#b0b0b0) on dark grey (#222222): ~8.7:1 ✅

---

## Implementation Status

### Consolidation Complete ✅

**Font Sizes Eliminated:**
- 24px → 20px (section headers, result card values)
- 13px → 12px (tooltip text)

**Font Weights Eliminated:**
- 300 → 400 (page title now uses normal weight)
- 500 → 600 (consolidated to semi-bold)
- "bold" → 700 (explicit numeric value)

**Pages Updated:**
- ✅ my-scenario.html (October 6, 2025)

**Remaining Work:**
- Apply same consolidation to other 8 HTML pages
- Verify mobile responsive typography
- Test readability on various screen sizes

---

## Mobile Considerations

### Responsive Typography Strategy

- **No font size changes on mobile** - maintains 16px minimum
- **Optimized spacing** rather than shrinking text
- **Touch-friendly targets** with adequate padding
- **Readable on small screens** without zoom

### Mobile-Specific Adjustments (per page)

```css
@media (max-width: 480px) {
    .page-header h1 {
        font-size: 20px;  /* Reduced from 28px for narrow screens */
    }

    .tooltip-text {
        font-size: 12px;  /* Maintained minimum readable size */
    }
}
```

---

## Future Considerations

### Potential Enhancements

1. **CSS Custom Properties** - Define typography as design tokens for easier maintenance
2. **Responsive Type Scale** - Use `clamp()` for fluid typography between breakpoints
3. **Line Height System** - Document line-height ratios for each font size
4. **Letter Spacing** - Consider slight adjustments for all-caps labels

### Migration Path

If switching fonts in future:
1. Maintain same size scale (28, 20, 16, 14, 12)
2. Maintain same weight scale (400, 600, 700)
3. Test for legibility on dark backgrounds
4. Consider font metrics (x-height, character width)

---

## Usage Examples

### Code Snippets

```css
/* Page Title */
.page-title {
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
}

/* Section Header */
.section-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
}

/* Default Body/Interactive Text */
.nav-menu a, label, .readonly-input {
    font-size: 16px;
    font-weight: 600;  /* For emphasis */
    color: #ffffff;
}

/* Secondary Text */
.data-table th, .user-info {
    font-size: 14px;
    font-weight: 400;
    color: #e0e0e0;
}

/* Tertiary/Small Text */
.tooltip-text, .result-card .label {
    font-size: 12px;
    font-weight: 400;
    color: #b0b0b0;
}
```

---

**Documentation Created**: October 6, 2025
**Project**: FIQuest Financial Independence Application
**Branch**: dark-mode-implementation
**Status**: my-scenario.html complete - other pages pending
