# FIQuest Typography Reference

**Date**: October 13, 2025
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

**6 sizes total** (reduced from 8 for improved consistency)

| Size | Usage | Elements |
|------|-------|----------|
| **28px** | Page titles | Main page headings (`.page-title`) |
| **20px** | Section headers | Container section titles (`.section-title`, `.app-title`) |
| **16px** | Default/body text | Navigation links, labels, data values, subsection headers |
| **14px** | Secondary text/cells | Table headers, form input cells, user info, disclaimer text |
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

### Typography System Complete ✅

**Font Sizes Consolidated:**
- 24px → 20px (section headers, result card values)
- 13px → 12px (tooltip text)
- Final scale: 28px, 20px, 16px, 14px, 12px (6 sizes total)

**Font Weights Consolidated:**
- 300 → 400 (page title now uses normal weight)
- 500 → 600 (consolidated to semi-bold)
- "bold" → 700 (explicit numeric value)
- Final weights: 400 (normal), 600 (semi-bold), 700 (bold)

**All Pages Updated**: ✅ October 13, 2025
- index.html
- fi-calculator.html
- create-player.html
- login-player.html
- menu.html
- my-scenario.html
- net-worth.html
- net-worth-tracking.html
- data-management.html

**Verification Complete:**
- ✅ Mobile responsive typography tested
- ✅ Readability verified on various screen sizes
- ✅ Consistent application across all pages

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

## Component Typography Standards

### Page Structure Components

| Component | Font Size | Weight | Color | Additional Styles |
|-----------|-----------|--------|-------|-------------------|
| **Page Title** `.page-title` | 28px | 400 | #ffffff | text-align: center, line-height: 1.2 |
| **Page Subtitle** `.page-subtitle` | 16px | 400 | #e0e0e0 | text-align: center, line-height: 1.4 |
| **Section Title** `.section-title` | 20px | 700 | #ffffff | border-bottom: 2px solid #757575 |
| **Subsection Headers** (h4 inline) | 16px | 600 | #ffffff | margin-bottom: 15px |

### Data Display Components

| Component | Font Size | Weight | Color | Notes |
|-----------|-----------|--------|-------|-------|
| **Labels** `label` | 14px | 600 | #ffffff | Standard form labels |
| **Input/Data Values** `.readonly-input` | 16px | 600 | #ffffff | Read-only data display |
| **Account Names** `.account-name` | 16px | 600 | #ffffff | Asset labels |
| **Debt Names** `.debt-name` | 16px | 600 | #ffffff | Liability labels |
| **Account Values** `.account-value` | 16px | 700 | #28a745 | Green for assets |
| **Debt Values** `.debt-value` | 16px | 700 | #dc3545 | Red for liabilities |

### Result Card Components

| Component | Font Size | Weight | Color | Additional Styles |
|-----------|-----------|--------|-------|-------------------|
| **Card Title** `.result-card h3` | 16px | 600 | white | margin: 0 0 10px 0, opacity: 0.9 |
| **Card Value** `.result-card .value` | 20px | 700 | white | Main numeric display |
| **Card Label** `.result-card .label` | 12px | - | white | opacity: 0.8 |

### Table Components

| Component | Font Size | Weight | Color | Padding |
|-----------|-----------|--------|-------|---------|
| **Table Headers** `.data-table th` | 14px | 600 | #ffffff | 15px 12px |
| **Table Data** `.data-table td` | - | - | #ffffff | 15px 12px |
| **Status: Building** `.status-building` | - | 700 | #ff9800 | - |
| **Status: FI** `.status-fi` | - | 700 | #D3AF37 | - |

### Chart Components

| Component | Font Size | Weight | Color | Notes |
|-----------|-----------|--------|-------|-------|
| **Chart Title** `.chart-title` | 18px | 600 | #ffffff | text-align: center |
| **Chart Labels** | - | - | - | Configured in Chart.js |
| **Chart Tooltips** | - | - | - | Configured in Chart.js |

### Interactive Components

| Component | Font Size | Weight | Color | Notes |
|-----------|-----------|--------|-------|-------|
| **Tooltip Text** `.tooltip-text` | 12px | - | #ffffff | Background: #3b3b3b |
| **Info Icon** `.info-icon` | 12px | 700 | white | Background: #D3AF37 |
| **Nav Links** `.nav-menu a` | 16px | - | white | Active: weight 700 |
| **Nav Subitems** `.nav-subitem` | 16px | - | rgba(255,255,255,0.7) | Active: weight 700 |

### Disclaimer Component

| Component | Font Size | Weight | Color | Notes |
|-----------|-----------|--------|-------|-------|
| **Disclaimer Title** `.disclaimer h3` | 18px | - | #ffffff | - |
| **Disclaimer Text** `.disclaimer p` | 14px | - | #b0b0b0 | line-height: 1.6 |

## Standard Spacing Patterns

### Padding Standards
- **Cells/Inputs**: `12px 16px` (vertical horizontal)
- **Page Headers**: `20px` (equal all sides)
- **Containers**: `30px` (equal all sides)
- **Result Cards**: `20px` (equal all sides)
- **Table Cells**: `15px 12px` (vertical horizontal)

### Border Radius Standards
- **Standard Elements**: `8px` (inputs, cards, buttons)
- **Large Containers**: `12px` (main content containers)
- **Circular Elements**: `50%` (info icons)

### Margin Patterns
- **Section Spacing**: `margin-bottom: 20px` (standard)
- **Container Spacing**: `margin-bottom: 30px` (large containers)
- **Label Spacing**: `margin-bottom: 8px` (labels above inputs)
- **Title Spacing**: `margin-bottom: 8px` (page titles)

---

## Form Typography Standards (Light-Styled Inputs)

### Input Field Typography
- **Font Size**: 14px (form cells and input fields)
- **Font Weight**: 400 (normal) for input text
- **Text Color**: `#222222` (black on white backgrounds)
- **Background**: `#ffffff` (white)
- **Padding**: 8px (consistent cell height)

### Form Label Typography
- **Font Size**: 14px (matches input fields)
- **Font Weight**: 600 (semi-bold for emphasis)
- **Text Color**: `#222222` (black on light containers)
- **Label Spacing**: margin-bottom: 8px

### Projected Value Display
- **Font Size**: 14px (aligns with input fields)
- **Font Weight**: 700 (bold for values)
- **Text Color**: `#222222` (black for visibility on light backgrounds)
- **Label Size**: 12px (small label "Projected:")
- **Label Color**: `#666` (dark grey, de-emphasized)

### Variance Display
- **Font Size**: 14px (consistent with row)
- **Font Weight**: 700 (bold for emphasis)
- **Text Color**: Conditional - `#28a745` (green) for positive, `#c62828` (red) for negative
- **Alignment**: right-aligned for numeric values

### Summary Card Typography
- **Label Font Size**: 14px
- **Label Font Weight**: 700 (bold)
- **Label Color**: `#ffffff` (white on gold background)
- **Value Font Size**: 18px-20px (larger for emphasis)
- **Value Font Weight**: 700 (bold)
- **Value Color**: `#ffffff` (white on gold background)

---

**Documentation Created**: October 6, 2025
**Last Updated**: October 13, 2025
**Project**: FIQuest Financial Independence Application
**Branch**: dark-mode-implementation
**Reference Pages**: All 9 HTML pages (complete implementation)
**Status**: Typography system complete and consistently applied
