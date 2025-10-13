# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FIQuest is a financial independence tracking application that uses gamification to encourage users to plan, track, and manage their personal finance journey. The project has evolved from a single-file financial calculator into a streamlined web application focused on core FI planning and net worth tracking functionality.

## Architecture

**Multi-Page Single-File Structure**: The application consists of 9 main HTML files, each containing all functionality for its specific feature:
- `index.html` - Welcome/landing page for new and returning users (renamed from start.html for GitHub Pages)
- `fi-calculator.html` - Main FI calculator with scenario planning
- `create-player.html` - User registration and character creation
- `login-player.html` - User authentication and game selection
- `menu.html` - Main navigation hub after user login
- `my-scenario.html` - Display and manage saved FI scenarios
- `net-worth.html` - Initial net worth setup with asset/liability tracking
- `net-worth-tracking.html` - Ongoing net worth entry and progress tracking
- `data-management.html` - Save file management and comprehensive CSV export

**Technology Stack**:
- Pure HTML/CSS/JavaScript (no framework or build system)
- Chart.js v3.9.1 library (external chart.min.js file) for data visualization
- FileSaver.js library (file-saver.js) for save file downloads
- LocalStorage for persistent data (all client-side, no server required)
- Vanilla JavaScript for calculations and DOM manipulation
- CSS Grid and Flexbox for responsive layout
- Dark mode design theme with gold accents for premium feel

**Data Persistence Architecture**:
- `user-manager.js` - Centralized user data management with UserManager class
- LocalStorage with structured keys (`fiquest_player_${username}`, `fiquest_scenarios`, etc.)
- DateTimeUtils class for timezone-aware data handling
- Future cloud migration path via Supabase integration

## Core Functionality

**Main Calculation Engine**: `calculateFI()` at `fi-calculator.html:1536`
- Handles multi-account investment portfolio setup
- Performs year-by-year financial projections with compound growth
- Manages debt payoff schedules and their impact on contributions
- Calculates FI achievement year and withdrawal sustainability
- Uses conservative approach: applies withdrawals BEFORE growth for post-FI years
- Supports up to 3 scenario comparisons with account-level detail

**User Management System**: `UserManager` class at `user-manager.js:67`
- Player creation, authentication, and data persistence
- Game state management across multiple sessions
- Data synchronization between localStorage and future cloud storage
- Automatic game data collection and player profile updates

**Net Worth Tracking**: Multi-entry system with historical comparison
- Initial setup via `net-worth.html` with customizable asset/liability categories
- Ongoing tracking via `net-worth-tracking.html` with date-based entries
- Asset allocation analysis with pie chart visualizations
- Projected vs actual variance tracking for goal monitoring
- Prorated projected values based on entry date for accurate variance calculations

**CSV Export**: Comprehensive data export functionality
- Year-by-year projection data for all scenarios
- Complete input parameters and account-level details
- Net worth tracking history with all entries
- All data exported in organized CSV format for external analysis

## Design Standards

**Color Palette** (Dark Mode with Gold Accents):
- **Primary Gold**: #D3AF37 (buttons, highlights, section underlines)
- **Secondary Gold**: #B8941E (button gradients, hover states)
- **Dark Backgrounds**: #222222 (main), #16213e (containers), #3b3b3b (secondary)
- **Light Containers**: #e0e0e0 (editable input sections)
- **Text Colors**: #ffffff (primary), #e0e0e0 (secondary), #b0b0b0 (muted)
- **Success Green**: #28a745 (positive variances, save buttons)
- **Danger Red**: #dc3545 (negative variances, debt values)
- **Cancel Red**: #f44336 → #d32f2f (cancel button gradient)

**Typography Standards**:
- **Font Family**: 'Helvetica Neue', Arial, sans-serif (universal)
- **Font Sizes**: 28px (page titles), 20px (section headers), 16px (body/inputs), 14px (secondary/cells), 12px (labels)
- **Font Weights**: 400 (normal), 600 (semi-bold labels), 700 (bold headers/values)
- **Minimum Input Size**: 16px to prevent iOS zoom

**Layout Standards**:
- **Containers**: Dark navy (#16213e) background, 1px solid #757575 border, 12px radius
- **Summary Cards**: Gold gradient background with white text
- **Form Inputs**: Light containers (#e0e0e0) for editable sections, white (#ffffff) input backgrounds
- **Grid Layouts**: CSS Grid for uniform cell sizing, typically 198px for readonly, 165px for editable
- **Spacing**: 8px padding for cells, 20px for sections, 30px for containers

**Component Patterns**:
- **Readonly Values**: Simple display with colored values (green for assets, red for debts)
- **Editable Sections**: Light grey containers with white input fields and black text (#222222)
- **Variance Display**: Green (#28a745) for positive, red (#c62828) for negative
- **Action Buttons**: Gold for primary, red for cancel, green for save

## Development Workflow

**No Build Process**: Pure HTML/CSS/JavaScript application with no package.json or build scripts. Files run directly in the browser.

**Testing**: Manual browser testing only. Open any HTML file directly to test functionality.

**Local Development**:
- Open any HTML file directly in browser (e.g., `start.html` to begin user flow)
- No server required for basic functionality
- Modern browser with JavaScript enabled and LocalStorage support required
- Use browser developer tools for debugging localStorage data

**Development Commands**:
- No lint, build, or test commands available - pure static HTML/CSS/JavaScript
- Use browser refresh to test changes
- Clear localStorage via browser console if needed: `localStorage.clear()`

**User Flow Testing**:
1. New user: `index.html` → `create-player.html` → `fi-calculator.html` → `my-scenario.html` → `net-worth.html` → `net-worth-tracking.html`
2. Returning user: `index.html` → `login-player.html` → `menu.html` → core features
3. Direct feature access: Open any HTML file directly for isolated testing

## Key Implementation Details

**Data Storage Patterns**:
- All user data stored in LocalStorage with consistent `fiquest_` prefixing
- Key storage keys: `fiquest_player_${username}`, `fiquest_scenarios`, `fiquest_active_scenario`, `fiquest_net_worth_setup`, `fiquest_net_worth_history`, `fiquest_current_net_worth`
- UserManager class handles data synchronization across pages
- DateTimeUtils provides timezone-aware date handling for entries
- Data flows between pages via localStorage reads/writes on page load

**Chart Integration**:
- Chart.js v3.9.1 library: standalone `chart.min.js` file (200KB)
- External file loaded via script tag (cached across all pages)
- Multiple chart types: portfolio growth, asset allocation pie charts, net worth tracking
- Dynamic data updates when scenarios or net worth entries change
- Responsive sizing for mobile/desktop compatibility

**Navigation Architecture**:
- Menu system organized around user progression: Initial Setup → Ongoing Tracking
- Context-aware navigation based on user completion status
- Seamless data persistence across page transitions

**Variance Calculations** (net-worth-tracking.html):
- Separates assets and liabilities for proper net worth variance computation
- Formula: `(Actual Assets - Actual Liabilities) - (Projected Assets - Projected Liabilities)`
- Prevents incorrect calculation where liabilities would increase variance
- Individual account variances: `Actual Value - Projected Value`
- Color-coded display: Green for positive, red for negative
- Prorated projected values based on entry date for accuracy

**Form Styling Patterns**:
- **Light Containers**: Used for editable input sections (#e0e0e0 background)
- **Dark Containers**: Used for readonly data display (#222222 or #3b3b3b background)
- **Input Fields**: White backgrounds (#ffffff) with black text (#222222) in light containers
- **Summary Cards**: Gold gradient backgrounds with white text for key metrics
- **Button Styling**: Gold for primary actions, green for save, red for cancel

## Key Implementation Functions

**Main Calculation Engine**: `calculateFI()` at `index.html:1524`
- Year-by-year financial projections with compound growth calculations
- Multi-account portfolio management with different growth rates
- Debt payoff scheduling and impact on contribution capacity
- FI date calculation and withdrawal sustainability analysis

**User Data Management**: `UserManager` class at `user-manager.js:67`
- Player authentication and profile management
- Cross-page data synchronization via localStorage
- Game state persistence and session management

**Date/Time Handling**: `DateTimeUtils` class at `user-manager.js:10`
- Browser-timezone-aware date formatting
- Consistent timestamp generation for entries
- Display formatting for different contexts