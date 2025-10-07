# FIQuest Current Color Scheme Reference

**Date**: October 1, 2025
**Theme**: Dark Mode with Gold Accents (Updated)

## Current Color Palette

### Background Colors
- **Darker Grey**: `#222222` (main containers, body backgrounds, structural elements)
- **Secondary Dark**: `#16213e` (cards, sections, content areas, sidebars)
- **Dark Grey**: `#3b3b3b` (row labels, projections, secondary backgrounds)
- **Medium Grey**: `#757575` (actual data cells, borders, dividers)

### Text Colors
- **Primary Text**: `#ffffff` (main headings, labels)
- **Secondary Text**: `#e0e0e0` (body text, descriptions)
- **Muted Text**: `#b0b0b0` (subtle text, placeholders)

### Gold Accent Colors
- **Primary Gold**: `#D3AF37` (primary buttons, borders, highlights, "FI" branding)
- **Hover Gold**: `#B8941E` (hover states, darker gold)
- **Text Gold**: `#8B6914` (gold text, darker for readability)

### Gold Gradient (Summary Cards)
- **Gradient**: `linear-gradient(135deg, #D3AF37 0%, #B8941E 100%)`
- Used on all key metric summary cards across the application

### Opacity Variations
- **Light Background**: `rgba(211, 175, 55, 0.1)` (very subtle gold backgrounds)
- **Medium Background**: `rgba(211, 175, 55, 0.8)` (semi-transparent gold)
- **Glass Effect**: `rgba(22, 33, 62, 0.3)` (dark glass overlay)

## Application Pages

### Fully Updated Pages ✅
All 9 pages now use the consistent color scheme:

1. **index.html** - Welcome/landing page
2. **create-player.html** - User registration
3. **login-player.html** - User authentication
4. **menu.html** - Main navigation hub
5. **fi-calculator.html** - Main FI calculator
6. **my-scenario.html** - Saved scenarios display
7. **net-worth.html** - Initial net worth setup
8. **net-worth-tracking.html** - Ongoing net worth tracking
9. **data-management.html** - Export and data management

## Key Design Elements

### Visual Hierarchy
1. **Gold Gradient Headers**: Premium summary cards and key metrics
2. **Darker Grey (#222222)**: Main backgrounds and structural elements
3. **Dark Grey (#3b3b3b)**: Row labels, projections, and secondary backgrounds
4. **Medium Grey (#757575)**: Data cells, borders, and dividers
5. **Gold Accents**: "FI" branding, buttons, and highlights

### Branding Elements
- **FIQuest Logo**: `<span style="color: #D3AF37;">FI</span>Quest` (consistent across all pages)
- **Summary Cards**: Gold gradient backgrounds for key metrics
- **Interactive Elements**: Gold hover states and focus indicators

### Dark Mode Optimization
- **Background**: True dark (#222222) optimized for OLED screens
- **Contrast**: High contrast ratios for accessibility compliance
- **Eye Comfort**: Reduced blue light with warm gold accents

## Usage Guidelines

### Color Application Rules
1. **Never use colors outside this palette** - maintain consistency
2. **Gold accents sparingly** - for highlights and key elements only
3. **Hierarchy respect** - darker colors for structure, lighter for content
4. **Accessibility first** - ensure proper contrast ratios

### Development Notes
- All color values are standardized across the application
- No light theme colors remain in any file
- Mobile responsiveness maintained with dark theme
- Chart.js visualizations use palette-compliant colors

## Implementation Status

### Color Migration Complete ✅
- **Old Primary Dark** `#1a1a2e` → **New Darker Grey** `#222222`
- **Old Navy Blue** `#0E0E55` → **New Darker Grey** `#222222`
- **Light Colors** removed and replaced with dark equivalents
- **Blue Accents** replaced with gold palette colors
- **Text Colors** optimized for dark backgrounds

### Consistency Achieved ✅
- All pages use identical color values
- Uniform visual experience across the application
- Professional dark mode appearance
- Gold "FI" branding consistently applied

---
**Documentation Created**: October 1, 2025
**Project**: FIQuest Financial Independence Application
**Branch**: dark-mode-implementation
**Status**: Complete - All 9 pages using consistent color scheme