# FIQuest.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web/iOS/Android application that encourages users (using gameification) to plan, track and manage their personal finance journey providing useful tips and reminders along the path to achieving Financial Independence.

Log - Vibe Coding started 8/22/25, Partially formed idea for FIQuest occured 9/04/25 after waking due to a thunderbolt at home.

To Do ✅

- play with presentation -> text size and style consistency across all pages, remove excess emojis, enable dark mode in settings, change themes, etc

- review where data is stored, local or cloud/secure?

- clear personal data, push to github

  🚀 Next Steps (Manual Actions Required)

  To complete the GitHub Pages deployment, follow these steps:

  1. Create GitHub Repository
  # Go to https://github.com/new
  # Create a new public repository named "FIQuest"
  # Don't initialize with README (we already have one)
  2. Push to GitHub
  git remote add origin https://github.com/YOURUSERNAME/FIQuest.git
  git branch -M main
  git push -u origin main
  3. Enable GitHub Pages
    - Go to your repository → Settings → Pages
    - Source: "Deploy from a branch"
    - Branch: "main"
    - Folder: "/ (root)"
    - Click "Save"
  4. Access Your Live App
    - Your app will be available at: https://YOURUSERNAME.github.io/FIQuest
    - GitHub will automatically serve index.html as the entry point
    - Updates deploy automatically when you push to main branch


- Explore reward system for entering Net Worth updates - animation, sound, motivational quote from Winky?, badges, prizes, objects, avatar items, etc


-  Add to Budget Page:
1) Account Setup section under the summary cards.  5 Customizable Accounts first column = "Account Name" with defaults as "Visa", "Amex", "Chequing", "Property Taxes", "Other" - use these values as the options the user can select when choosing an "Account" using dropdown functionality while in edit/update mode of the month budget tracking table.  Next column = "Account Type" with defaults in dropdown menu of "Credit Card", "Credit Card", "Cash", "Periodic", "Other".  Next column = "Monthly Pay Date" 
2) Cashflow Date to Monthly Budget Tracking table, visible only upon edit/update (similar to "Type", add this new column to the right of "Type").  Allow user to enter up to 4 day of the month values from 1-31 separated by commas.  For example = "1,15".  This data will be used for the Cashflow page.


- Let's plan out the Cashflow page: add "Cashflow" link in menu just below "Budget".  Let's use the Budget page as a starting point as we build Cashflow page as it already has many design elements we can leverage and it would be good to have continuity in the UI for the user.  

At the top of the page, allow the user to define the "Cashflow Account" using a dropdown that populates with the unique values entered from the Budget Table "Account" Column (no duplicates). 



Taking the Monthly Budget Tracking table as a template, replace "Item Name" column with "Month".  Next column to the right will be 

and below the user will custom input line item names eg. Merriam Music, Mathnasium, Crunchroll, Spotify, Home & Auto Insurance, etc you can use these as editable defaults to give the user an idea of how to use) - allow 25 such rows for the user to enter items (add edit/update button at the top of the table to allow user to modify the budget line names and amounts as well as the order of items by drag and drop.  Next column to the right will be "Category" which will be used to group items for later analysis and reporting eg. Kid's Activities, Kid's Activities, Phone/Internet/Cable, Phone/Internet/Cable, Home/Auto Insurance, etc.  The next column should be labeled "Account" eg. TD Credit Card, Amex Credit Card, Chequing Account, etc.  We will use this data later as well as everything else saved in this table for the Cashflow page and functionality.  The next column should be "Amount" where the user can input the expected monthly amount for this budget item.  At the bottom let's sum all the above values in a row labeled "Net Total".  At the bottom of this column, also include separate totals for Incomes and Expenses (sum of either positive values for incomes and negative values for expenses).  After this column is where we should freeze the pane so a user can scroll right while still seeing these columns and totals frozen on the left for reference.  Once the budget categories are saved (by clicking edit/update button again, upon initial click to allow edit change the label of the button to "Save" and then after user hits save, revert back to "Edit/Update") create columns to the right until 12 total are available with Month and Year as their headers.  Similar to the Net Worth Tracking page, let's allow a user to update current values with the same Entry Date and general format however replacing the Assets and Liabilities Sections with the budget lines that have been saved (similar projected/actual/variance functionality in the form) and then once user hits "Save Entry", add a new column in the correct position from left to right based on entry date into the Budget Table above.  Allow the user to delete an entry in the table again, just like the net worth tracking table.

- At some point consider integrating tax advantaged account limits (RRSP, RESP, TFSA, etc)

 - Add Cash vs. Stock tracking for each account type.

⏺ Implementation Roadmap

  Step 3: Progress Visualization
  - Extend existing Chart.js implementation
  - Add progress vs. target tracking charts
  - Show historical net worth trends

  Step 4: Supabase Integration
  // Add to head of index.html
  <script src="https://unpkg.com/@supabase/supabase-js@2"></script>

  // Initialize Supabase
  const supabase = supabase.createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
  );

  // Migration function
  async function migrateToCloud() {
    const localData = localStorage.getItem(`fiquest_${username}`);
    if (localData) {
      await supabase.from('user_entries').insert(JSON.parse(localData));
      localStorage.removeItem(`fiquest_${username}`);
    }
  }

⏺ Key Benefits of This Approach:

  1. Zero disruption - Start with localStorage, users can begin immediately
  2. Progressive enhancement - Migrate to cloud storage when ready
  3. Cost-effective - Free tiers cover early development
  4. Scalable - Supabase handles millions of users
  5. Maintains current architecture - Minimal changes to existing FIcalc code

  Next Immediate Steps:

  1. Add username field to current FIcalc form
  2. Modify calculateFI() at FIcalc/index.html:903 to save results
  3. Create monthly entry form using same styling as current calculator
  4. Add progress charts using existing Chart.js setup

  This approach lets you start tracking users immediately while building toward a robust cloud-based solution. The single-file architecture can evolve
  gradually without requiring a complete rewrite.


2) Net Worth & investing/DCA input and tracking
3) Budget input and tracking -> update active and inactive spending estimates and recalculate goal
4) Cashflow tracking and management
5) UI to link everything, add game theme

Navigation bar on the left to move between:
Initial Setup
Budget/Cashflow Setting
Net Worth Update Entry
Budget Update Entry
Cashflow Update Entry
Reporting


## Architecture TBD

**Single-File Application**: The entire application is contained in `index.html` files:
- `/FIcalc/index.html` - Basis for setting FI target 

**Technology Stack**:
- Pure HTML/CSS/JavaScript (no framework)
- Chart.js library (embedded, minified) for data visualization
- Vanilla JavaScript for all calculations and DOM manipulation
- CSS Grid and Flexbox for responsive layout


**Key Components**:
- Input form with multiple sections (personal info, spending, investments, debts)
- Financial calculation engine with compound growth modeling
- Interactive charts for visualization
- Scenario comparison (up to 3 scenarios)
- Responsive design for mobile/desktop

- Title Screen to provide fun/game feel
- New Game or Continue -> Local or Cloud account?  Suggest Cloud for redundancy
- Character/Avatar select -> Player Name ->  Input form with multiple sections (personal info, spending, investments, debts)
- Use FICalc to set FI Goal & Allow changes later on -> rewards for adhering to path
- After initial setup and walk through, provide dopamine reward/feeling of accomplishment, save progress (ask for email separately) 

- Net worth tracking by account type with asset allocation and cash target vs. actuals = close ring reward

- Monthly Budget and Cashflow setup/updating = close ring reward

- Monthly Investing setup/updating/dca = close ring reward

- Market Valuation tracking/notifcations - Schiller PE, 20% drops from high
- Plan vs Actual 
- RPG style Tooltips and dialogue boxes along the way including analysis of data to make suggestions eg. Donate once a year instead of monthly and put in rrsp for annual refund for donation instead
- Periodic reporting
- Rrsp/tfsa/resp optimizer
- Cashflow forecasting incorporating budget, warnings and tips
- Reward completion of will, link to will provided to family member. Summary of accounts/plan for family, redundancy -> critical selling point
- Monthly or quarterly reminders/notifications, ability to skip months of data and allow adhoc refresh (welcome back with open arms + reward)
- Speedometer or some other motivating progress indicator
- Sidequest/bucket list feature

In-app purchases, free tier initially offer premium once user base grows



 -  log changes, replace all of my spreadsheets, what are research backed healthy personal finance habits, even with all data saved do not allow enough for user to be identified or hacked, truncate pennies,storyboards in procreate/Freeform




## Core Functionality

**Main Calculation Function**: `calculateFI()` at line 660
- Handles user inputs validation
- Performs year-by-year financial projections
- Manages debt payments and their impact on contributions
- Calculates FI achievement year and portfolio sustainability

**Key Financial Models**:
- Compound investment growth with annual contributions
- Debt payoff calculations (mortgage, vehicle, other debts)
- Inflation adjustments for expenses
- Withdrawal rate sustainability analysis
- Age-based spending variations (active vs inactive years)

**Chart Integration**:
- Uses embedded Chart.js library for portfolio growth visualization
- Dynamic data updates when scenarios change
- Responsive chart sizing

## Development Notes

**File Structure**: This is a monolithic single-file application. All HTML, CSS, and JavaScript code is contained within the HTML files.

**No Build Process**: There are no package.json, build scripts, or dependency management. The application runs directly in the browser.

**Testing**: No formal test framework. Manual testing through browser interaction is the primary testing method.

**Browser Compatibility**: Uses modern JavaScript features, requires modern browsers (ES6+).



Completed:
1) Enhance FIcalc to level of detail required to track Net Worth: 
 ✅ - Show (default) Starting Capital now as sum of Account Types with Custom Names that user can input (with defaults names as RRSP1, RRSP2, TFSA1, TFSA2, Taxable Brokerage, Other) and make Total Starting Capital now equal to the sum of these accounts for the purposes of the FI calculation.  Allow user to hide the detailed account level view and when this is toggled on, show only Starting Capital (sum of account types).

✅ - For all $ values in the input value section, format with "," so thousands are easier to view.

✅ - Reorder inputs = Current Age, Active Until Age, Life Expectancy, Starting Capital, Annual Contributions, Annual Active Spending, Annual Inactive Spending, Rate of Return, Inflation Rate, Withdrawal Rate.  Have starting capital expanded by default (Hide Account Details showing).

✅ - Integrate the starting capital investment account breakdown into the Annual Contributions input so that contributions are inputted in line with the same custom starting capital account names and values.  Annual contributions should follow the same method of summing to the total of each account inputted, as well as hidden when "Hide Account Details" is toggled.

SAVED BACKUP ao 9.7.25

Ready for the next phase? We could implement ✅ scenario saving, or start building the net worth tracking page using the same account structure you've established.

✅ - Let's build a initial net worth setup page next which prepopulates with the user's selected scenario input values.  In the Asset section, list the investment accounts.  Add customizable Asset Names along with a place for the user to input values.  For defaults, let's start with "Cash" = 15,000, "Home" = 1,500,000, "Stock Options/RSUs" = 150,000, "Crypto" = 35,000, "Other" = 1000.  In the Liabilities section, list Mortgage, Vehicle Loan, Other from Debt Tracking.  Add customizable Liability Names with a place for the user to input values.  For defaults, let's start with "HELOC" = 450,000, "Other" = 10,000.  Use all the above data to calculate Current Net Worth.  In a separate section below, present Asset Allocation in a Pie Chart with Stocks (equal to all investment accounts divdend by the sum of all assets), apply the same to each other customized Asset type as entered above.

✅ - /plan help me figure out the best way to incorporate allowing the user to input   │
│   their current net worth values (assets and liabilities as listed in the net       │
│   worth tracking table) where each time they hit the "update current values"        │
│   button, it creates a new entry that can be permanently added to their game        │
│   save/shows up as a record on their net worth tracking page that uses the local    │
│   date from their browser as the default but allows them the option to override     │
│   the date of the entry as well.  It should allow them to modify or delete old      │
│   entries and it should be easy for the user to see how each entry compares with    │
│   the net projections data so they can see how they are doing relative to the       │
│   projected balances.              

✅ - Allow Multiple other assets like house/rental property/pokemon cards/crypto to be entered with custom names (for net worth tracking only, don't incorporate into FIcalc result)

✅ - Add Asset Allocation breakdown by % of net assets


✅ New User setup -> save to database for tracking over time


✅ - FI Calculator and Net worth setup should be rarely used after the initiial setup so we should restructure the menu bar to have those two links appear when the user clicks a link called "Initial Setup".  Once Iniital setup has been complete, players should land on My Scenario upon any subsequent continue game logins and access Net Worth Tracking, etc from there on out.  When a new player is starting a game, follow the process flow of FI Calculator -> Select Scenario -> Net Worth Setup -> Save and proceed to Net Worth Tracking but when a user has already completed those steps players land on My Scenario as explained above.

✅ - Let's plan out the Budget Page (plan to have Cashflow as it's own separate page) and functionality.  Rename Budget & Cashflow link in menu to "Budget".  Let's use the Net Worth Tracking page as a starting point as we build Budget page as it already has many design elements we can leverage and it would be good to have continuity in the UI for the user.  Taking the Net Worth Projection by Year table as a template, replace "Asset / Liability" column with "Income / Expense" and below the user will custom input line item names eg. Merriam Music, Mathnasium, Crunchroll, Spotify, Home & Auto Insurance, etc you can use these as editable defaults to give the user an idea of how to use) - allow 25 such rows for the user to enter items (add edit/update button at the top of the table to allow user to modify the budget line names and amounts as well as the order of items by drag and drop.  Next column to the right will be "Category" which will be used to group items for later analysis and reporting eg. Kid's Activities, Kid's Activities, Phone/Internet/Cable, Phone/Internet/Cable, Home/Auto Insurance, etc.  The next column should be labeled "Account" eg. TD Credit Card, Amex Credit Card, Chequing Account, etc.  We will use this data later as well as everything else saved in this table for the Cashflow page and functionality.  The next column should be "Amount" where the user can input the expected monthly amount for this budget item.  At the bottom let's sum all the above values in a row labeled "Net Total".  At the bottom of this column, also include separate totals for Incomes and Expenses (sum of either positive values for incomes and negative values for expenses).  After this column is where we should freeze the pane so a user can scroll right while still seeing these columns and totals frozen on the left for reference.  Once the budget categories are saved (by clicking edit/update button again, upon initial click to allow edit change the label of the button to "Save" and then after user hits save, revert back to "Edit/Update") create columns to the right until 12 total are available with Month and Year as their headers.  Similar to the Net Worth Tracking page, let's allow a user to update current values with the same Entry Date and general format however replacing the Assets and Liabilities Sections with the budget lines that have been saved (similar projected/actual/variance functionality in the form) and then once user hits "Save Entry", add a new column in the correct position from left to right based on entry date into the Budget Table above.  Allow the user to delete an entry in the table again, just like the net worth tracking table.

✅ - When the user opens the update current values form to make a new entry, let's have the "Projected:" values prorate a value between the annual projected year results using the entry date selected.  So for example, if the user entry date is 6/15/2026 let's display the value between the 2026 projected value for that account and the 2027 projected value for that account's (or other asset, or liablility, etc) Projected display (and hence the Variance column will give them a more accurate idea of where they stand).

✅Clean Version focused on FI Scenario setting and Net Worth Tracking 
- Remove Budget, Progress Reports, Settings pages and update all menus/inks/references in remaining pages accordingly



✅ - The index.html page is really large in size because we had to do a workaround in order to get the charts to show up in Github pages.  That was back when we had everything in a single page setup but I'm wondering if there's a better solution now that we are not limited by a single page setup?  Perhaps storing the chart code somewhere else and then calling it separately so it's more efficient to work on the index.html page itself?  

⏺ User approved Claude's plan:
  ⎿  Plan: Chart.js Optimization for Multi-Page Setup

     Current Situation Analysis

     File Sizes:
     - index.html: 321KB (contains full Chart.js v3.9.1 + 3 chart instances)
     - net-worth-tracking.html: 117KB (contains full Chart.js v3.9.1 + 2 chart instances)
     - Total duplication: ~250KB of Chart.js library embedded twice

     Chart Usage:
     - index.html: Asset allocation chart, portfolio chart, spending chart
     - net-worth-tracking.html: Net worth chart, asset allocation chart

     Optimization Solutions

     Option 1: External Chart.js File (Recommended)
     - Extract Chart.js library to chart.min.js (≈250KB)
     - Reference via <script src="chart.min.js"></script> in both pages
     - Benefits: 
       - Reduces each HTML file by 250KB
       - Browser caching (library loaded once, cached for all pages)
       - Easier to update Chart.js version
       - Cleaner, more maintainable code
     - Result: index.html ≈70KB, net-worth-tracking.html ≈35KB

     Option 2: CDN with Local Fallback
     - Use Chart.js CDN: https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js
     - Include local fallback for offline use
     - Benefits:
       - Zero file size impact
       - Always up-to-date
       - Excellent browser caching across websites
     - Considerations: Requires internet connection (acceptable for GitHub Pages)

     Option 3: Shared Chart Module (Advanced)
     - Create charts.js with reusable chart creation functions
     - Import chart configurations and data binding logic
     - Benefits: Even cleaner code organization, reusable chart components

     Implementation Plan

     Phase 1: Extract Chart.js Library
     1. Extract Chart.js code from index.html (lines ~7-20 to ~1200)
     2. Save as chart.min.js
     3. Replace embedded Chart.js with <script src="chart.min.js"></script> in both files
     4. Test all chart functionality

     Phase 2: Optional Chart Utilities
     1. Create chart-utils.js with common chart configurations
     2. Move reusable chart setup functions (colors, responsive settings, etc.)
     3. Further reduce code duplication between pages

     Phase 3: Consider CDN Migration
     1. Test CDN version compatibility
     2. Implement CDN with local fallback
     3. Remove local chart.min.js if CDN works reliably

     Expected Results

     - File size reduction: 438KB → ~155KB total (65% reduction)
     - Better maintainability: Single Chart.js file to update
     - Improved performance: Browser caching, faster subsequent page loads
     - GitHub Pages compatible: External files work perfectly on GitHub Pages
     - Development efficiency: Easier to work with smaller HTML files

     Technical Benefits for Development

     - Faster file editing: index.html becomes much more manageable
     - Better code organization: Separation of library code from application logic
     - Easier debugging: Chart-related issues isolated to specific files
     - Version management: Single location for Chart.js updates

     This optimization takes full advantage of your multi-page architecture and eliminates the 
     original single-page constraint that required embedding Chart.js.

Updating index.html to use external chart.min.js… (esc to interrupt · ctrl+t to hide todos)
  ⎿  ☒ Extract Chart.js library from index.html
     ☒ Save Chart.js as external chart.min.js file
     ☐ Update index.html to use external chart.min.js
     ☐ Update net-worth-tracking.html to use external chart.min.js
     ☐ Test all chart functionality
     ☐ Verify file size reductions

⏺ Perfect! Now I can see that the Chart.js ends at line 21. Let me look at what comes after the
  closing  tag:

⏺ Bash(sed -n '21,30p' /Users/davengai/Desktop/Working/FIQuest/index.html)
  ⎿  </script>                    
         <style>
             body {
     … +7 lines (ctrl+o to expand)

⏺ Great! Now I have the structure. The Chart.js library is embedded from line 7 to line 21. I need
   to:
  1. Remove lines 7-21 (the embedded Chart.js)
  2. Add a script tag to reference the external chart.min.js file

  Let me do this step by step. First, let me replace the embedded Chart.js with the external
  script reference:

✻ Updating index.html to use external chart.min.js… (esc to interrupt · ctrl+t to hide todos)
  ⎿  ☒ Extract Chart.js library from index.html
     ☒ Save Chart.js as external chart.min.js file
     ☐ Update index.html to use external chart.min.js
     ☐ Update net-worth-tracking.html to use external chart.min.js
     ☐ Test all chart functionality
     ☐ Verify file size reductions


✅- modify so you can enter initial setup as a backdated date

