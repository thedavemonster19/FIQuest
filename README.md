# FIQuest - Financial Independence Journey

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://yourusername.github.io/FIQuest)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A gamified financial independence tracking application that helps users plan, track, and manage their personal finance journey through an engaging web-based platform.

## 🚀 Live Demo

Visit the live application: **[FIQuest on GitHub Pages](https://yourusername.github.io/FIQuest)**

## 📖 Overview

FIQuest transforms the complex journey of financial independence planning into an engaging, game-like experience. Users create characters, set financial goals, track net worth, and visualize their progress through interactive charts and projections.

### Key Features

- **🎮 Gamified Experience**: Character creation and progress tracking with save file management
- **📊 Interactive FI Calculator**: Multi-account portfolio planning with year-by-year projections
- **💰 Net Worth Tracking**: Comprehensive asset/liability tracking with variance analysis
- **📈 Visual Analytics**: Real-time charts for portfolio growth, asset allocation, and net worth trends
- **🎯 Scenario Management**: Save and compare up to 3 financial independence strategies
- **💾 Data Export**: Comprehensive CSV export with year-by-year projections and detailed inputs
- **📱 Responsive Design**: Dark mode interface optimized for desktop and mobile devices
- **🔒 Privacy-First**: All data stored locally in browser with optional save file exports

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js v3.9.1 for data visualization
- **Storage**: LocalStorage for client-side data persistence
- **File Management**: FileSaver.js for save file exports
- **Deployment**: GitHub Pages (static hosting)
- **Architecture**: Multi-page single-file structure (no build process required)
- **Design**: Dark mode with gold accents optimized for readability

## 🏗️ Application Structure

```
FIQuest/
├── index.html              # Landing page (welcome/start)
├── fi-calculator.html       # Main FI calculator with scenario planning
├── create-player.html       # User registration and character creation
├── login-player.html        # User authentication
├── menu.html               # Main navigation hub
├── my-scenario.html        # Display and manage saved FI scenarios
├── net-worth.html          # Initial net worth setup
├── net-worth-tracking.html # Ongoing net worth entry and tracking
├── data-management.html    # Save file management and CSV export
├── user-manager.js         # Centralized user data management
├── file-saver.js           # File download utility for save files
├── chart.min.js           # Chart.js library for visualizations
└── CLAUDE.md              # Development documentation
```

## 🎯 User Journey

### New Users
1. **Landing** (`index.html`) → Welcome and overview
2. **Registration** (`create-player.html`) → Character creation
3. **FI Planning** (`fi-calculator.html`) → Initial financial independence setup
4. **Scenario Review** (`my-scenario.html`) → Review and save FI scenarios
5. **Net Worth Setup** (`net-worth.html`) → Initial asset/liability entry
6. **Tracking** (`net-worth-tracking.html`) → Ongoing progress monitoring

### Returning Users
1. **Landing** (`index.html`) → Quick access to features
2. **Login** (`login-player.html`) → Authentication
3. **Dashboard** (`menu.html`) → Navigate to desired features

## 🚀 Getting Started

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FIQuest.git
   cd FIQuest
   ```

2. **Open in browser**
   ```bash
   # Open any HTML file directly
   open index.html
   # OR serve with a simple HTTP server
   python -m http.server 8000
   ```

3. **Start using the app**
   - Navigate to `index.html` to begin
   - Create a new character or login with existing credentials
   - Follow the guided setup process

### No Build Process Required

FIQuest is designed as a pure static web application - simply open any HTML file in your browser to start using it. No compilation, bundling, or server setup needed.

## 📊 Core Functionality

### FI Calculator Engine
- **Multi-account portfolio management** (401k, IRA, Taxable, etc.)
- **Year-by-year financial projections** with compound growth
- **Debt payoff integration** and impact on contributions
- **Withdrawal sustainability calculations** using safe withdrawal rates

### Net Worth Tracking
- **Comprehensive asset categorization** (investments, real estate, cash, etc.)
- **Historical tracking** with date-based entries
- **Visual progress monitoring** through interactive charts
- **Variance analysis** between projected and actual values

### Data Management
- **LocalStorage persistence** for client-side data (no server required)
- **UserManager class** for centralized data operations
- **Cross-page data synchronization** across all features
- **Save file import/export** for data backup and portability
- **Comprehensive CSV export** with year-by-year projections and account details
- **Privacy-focused** - all data stays on your device unless you export it

## 🎨 Features Showcase

- **Interactive Charts**: Portfolio growth, asset allocation, spending vs. withdrawal capacity
- **Responsive Design**: Mobile-friendly interface with touch-optimized controls
- **Data Visualization**: Real-time updates as users modify scenarios
- **Progress Tracking**: Visual indicators of financial independence milestones
- **Scenario Comparison**: Side-by-side analysis of different FI strategies

## 🔧 Development

### File Structure
- **Single-file architecture**: Each HTML file contains all CSS and JavaScript
- **Modular user management**: Shared `user-manager.js` across all pages
- **External chart library**: `chart.min.js` for consistent visualizations

### Local Development
```bash
# No build process - edit files directly
# Test by opening HTML files in browser
# Use browser dev tools for debugging
```

### Adding Features
1. Modify existing HTML files or create new ones
2. Update navigation links in affected pages
3. Test user flows across all entry points
4. Update documentation in CLAUDE.md

## 📈 Performance

- **Optimized file sizes**: Chart.js extracted to separate file for caching
- **Client-side storage**: No server dependencies for core functionality
- **Fast loading**: Static files served directly from GitHub Pages CDN
- **Responsive rendering**: Charts and layouts adapt to all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chart.js** for powerful data visualization capabilities
- **GitHub Pages** for free static hosting
- **Modern web standards** for enabling client-side applications

---

**Start your financial independence journey today!** 🚀

[🌐 Live Demo](https://yourusername.github.io/FIQuest) | [📧 Report Issues](https://github.com/yourusername/FIQuest/issues) | [⭐ Star this repo](https://github.com/yourusername/FIQuest)