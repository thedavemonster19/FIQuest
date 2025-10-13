# FIQuest Current Color Scheme Reference

**Date**: October 13, 2025
**Theme**: Dark Mode with Gold Accents (Updated)

## Current Color Palette

### Background Colors
- **Darker Grey**: `#222222` (main containers, body backgrounds, structural elements)
- **Secondary Dark**: `#16213e` (cards, sections, content areas, sidebars)
- **Dark Grey**: `#3b3b3b` (row labels, projections, secondary backgrounds)
- **Medium Grey**: `#757575` (actual data cells, borders, dividers)
- **Light Container**: `#e0e0e0` (editable input sections, light-styled forms)
- **White**: `#ffffff` (input field backgrounds, maximum contrast text)

### Text Colors
- **Primary Text**: `#ffffff` (main headings, labels on dark backgrounds)
- **Secondary Text**: `#e0e0e0` (body text, descriptions)
- **Muted Text**: `#b0b0b0` (subtle text, placeholders)
- **Black Text**: `#222222` (text on light backgrounds, input fields)

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

## Component-Specific Color Applications

### Page Structure
- **Page Headers** (`.page-header`)
  - Background: `#16213e` (secondary dark)
  - Border: `1px solid #757575` (medium grey)
  - Border radius: `8px`
  - Box shadow: `0 2px 4px rgba(0,0,0,0.1)`

- **Containers** (`.container`)
  - Background: `#16213e` (secondary dark)
  - Border: `1px solid #757575` (medium grey)
  - Border radius: `12px`
  - Box shadow: `0 4px 15px rgba(0,0,0,0.1)`

- **Section Titles** (`.section-title`)
  - Text color: `#ffffff` (primary text)
  - Border-bottom: `2px solid #757575` (medium grey)

### Data Display Elements

- **Input/Data Cells** (`.readonly-input`, `.account-item`, `.debt-item`)
  - Background: `#3b3b3b` (dark grey)
  - Border: `2px solid #757575` (medium grey)
  - Border radius: `8px`
  - Text color: `#ffffff` (primary text)

- **Result Cards** (`.result-card`)
  - Background: `linear-gradient(135deg, #D3AF37 0%, #B8941E 100%)` (gold gradient)
  - Text color: `white`
  - Border radius: `8px`

- **Data Tables** (`.data-table`)
  - Table background: `#16213e` (secondary dark)
  - Header background: `#222222` (darker grey)
  - Grid lines: `#000000` (black) - IMPORTANT for visibility
  - Header border: `2px solid #000000`
  - Cell border: `1px solid #000000`
  - Hover background: `#222222` (darker grey)

### Interactive Elements

- **Tooltips** (`.tooltip-text`)
  - Background: `#3b3b3b` (dark grey)
  - Text color: `#ffffff` (primary text)
  - Border color (arrow): `#3b3b3b`
  - Box shadow: `0 4px 8px rgba(0,0,0,0.3)`

- **Info Icons** (`.info-icon`)
  - Background: `#D3AF37` (primary gold)
  - Text color: `white`

### Charts (Chart.js)

- **Chart Containers** (`.chart-container`)
  - Background: `#16213e` (secondary dark)
  - Border radius: `12px`
  - Box shadow: `0 2px 10px rgba(0,0,0,0.1)`

- **Chart Grid Lines**
  - Color: `#000000` (black) - configured in Chart.js options
  - Applied to both x and y axes
  - CRITICAL: Default Chart.js colors too light - must explicitly set to black

### Semantic Colors

- **Status Indicators**
  - Building status: `#ff9800` (orange)
  - FI Achieved: `#D3AF37` (primary gold)

- **Financial Values**
  - Assets/Positive: `#28a745` (green)
  - Debts/Negative: `#dc3545` (red)

- **Variance Colors**
  - Positive Variance: `#28a745` (green) - actual exceeds projected
  - Negative Variance: `#c62828` (red) - actual below projected

- **Action Button Colors**
  - Save/Confirm: `#28a745` (green)
  - Cancel: `linear-gradient(135deg, #f44336 0%, #d32f2f 100%)` (red gradient)
  - Primary Action: `linear-gradient(135deg, #D3AF37 0%, #B8941E 100%)` (gold gradient)

- **Disclaimer**
  - Background: `#3b3b3b` (dark grey)
  - Text: `#b0b0b0` (muted text)
  - Border: `1px solid #757575` (medium grey)

### Mobile Menu Button

- **Default State**
  - Background: `#D3AF37` (primary gold)
  - Text color: `white`
  - Box shadow: `0 2px 10px rgba(0,0,0,0.3)`

- **Hover State**
  - Background: `#B8941E` (hover gold)

### Form Component Colors (Light-Styled Inputs)

- **Additional Liabilities Container**
  - Background: `#e0e0e0` (light container)
  - Border: `1px solid #757575` (medium grey)
  - Border radius: `5px`
  - Padding: `15px`

- **Form Input Fields (Light Style)**
  - Background: `#ffffff` (white)
  - Border: `1px solid #757575` (medium grey)
  - Border radius: `8px`
  - Text color: `#222222` (black)
  - Padding: `8px`

- **Projected Value Display (Light Style)**
  - Label color: `#666` (dark grey)
  - Value color: `#222222` (black)
  - Font weight: 700 (bold)

- **Summary Card (Gold Style)**
  - Background: `linear-gradient(135deg, #D3AF37 0%, #B8941E 100%)` (gold gradient)
  - Text color: `#ffffff` (white)
  - All labels and values: white for maximum contrast
  - Border radius: `8px`
  - Padding: `15px`

---
**Documentation Created**: October 1, 2025
**Last Updated**: October 13, 2025
**Project**: FIQuest Financial Independence Application
**Branch**: dark-mode-implementation
**Reference Page**: net-worth-tracking.html (fully updated with form styling)