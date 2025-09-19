# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FIQuest is a financial independence tracking application that uses gamification to encourage users to plan, track, and manage their personal finance journey. The project has evolved from a single-file financial calculator into a streamlined web application focused on core FI planning and net worth tracking functionality.

## Architecture

**Multi-Page Single-File Structure**: The application consists of 8 main HTML files, each containing all functionality for its specific feature:
- `index.html` - Welcome/landing page for new and returning users (renamed from start.html for GitHub Pages)
- `fi-calculator.html` - Main FI calculator with scenario planning (322KB, includes embedded Chart.js)
- `create-player.html` - User registration and character creation
- `login-player.html` - User authentication and game selection
- `menu.html` - Main navigation hub after user login
- `my-scenario.html` - Display and manage saved FI scenarios
- `net-worth.html` - Initial net worth setup with asset/liability tracking
- `net-worth-tracking.html` - Ongoing net worth entry and progress tracking (118KB)

**Technology Stack**:
- Pure HTML/CSS/JavaScript (no framework or build system)
- Chart.js v3.9.1 library (embedded and minified) for data visualization
- LocalStorage for persistent data (planned migration to Supabase cloud storage)
- Vanilla JavaScript for calculations and DOM manipulation
- CSS Grid and Flexbox for responsive layout

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
- Embedded in `index.html` (321KB total) and `net-worth-tracking.html` (117KB total)
- Multiple chart types: portfolio growth, asset allocation pie charts, net worth tracking
- Dynamic data updates when scenarios or net worth entries change
- Responsive sizing for mobile/desktop compatibility

**Navigation Architecture**:
- Menu system organized around user progression: Initial Setup → Ongoing Tracking
- Context-aware navigation based on user completion status
- Seamless data persistence across page transitions

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