/**
 * FIQuest Test Data for Screenshot Capture
 * Realistic user and financial data for demonstrating app functionality
 */

// Test user profile
const testUser = {
    playerName: "TestUser",
    email: "test@example.com",
    avatar: "🎯",
    characterClass: "Financial Strategist",
    creationDate: "9/27/2025",
    level: 3,
    experience: 750,
    achievements: ["First Scenario", "Calculator Master", "Net Worth Tracker"],
    gameData: {
        scenarios: [],
        activeScenario: null,
        netWorthSetup: null,
        netWorthHistory: [],
        currentNetWorth: null
    }
};

// Realistic FI scenario with complete inputs and calculated results
const testScenario = {
    name: "Conservative Retirement Plan",
    inputs: {
        startingCapital: 75000,
        currentAge: 35,
        lifeExpectancy: 90,
        activeUntilAge: 65,
        activeSpending: 60000,
        retiredSpending: 48000,
        inflationRate: 3,

        // Investment accounts
        investmentAccounts: {
            total: 75000,
            accounts: [
                { name: "401k", balance: 45000, growthRate: 7, contributionRate: 8000 },
                { name: "Roth IRA", balance: 20000, growthRate: 7, contributionRate: 6000 },
                { name: "Taxable", balance: 10000, growthRate: 6, contributionRate: 12000 }
            ]
        },

        // Debts
        debts: {
            mortgage: { balance: 250000, rate: 4.5, payment: 1800, extraPayment: 200 },
            studentLoan: { balance: 25000, rate: 5.5, payment: 350, extraPayment: 50 },
            creditCard: { balance: 8000, rate: 18, payment: 400, extraPayment: 100 },
            other: { balance: 0, rate: 0, payment: 0, extraPayment: 0 }
        }
    },
    results: {
        fiAge: 62,
        fiYear: 2052,
        portfolioAtFI: 1250000,
        yearsToFI: 27,
        withdrawalRate: 3.84,
        sustainabilityScore: 95,
        projections: [
            { year: 2025, age: 35, portfolioValue: 75000, totalSpending: 60000 },
            { year: 2030, age: 40, portfolioValue: 185000, totalSpending: 62000 },
            { year: 2040, age: 50, portfolioValue: 485000, totalSpending: 66000 },
            { year: 2050, age: 60, portfolioValue: 1100000, totalSpending: 70000 },
            { year: 2052, age: 62, portfolioValue: 1250000, totalSpending: 48000 }
        ]
    },
    color: "#D3AF37"
};

// Net worth setup with realistic asset categories
const netWorthSetup = {
    scenario: testScenario,
    setupDate: "9/27/2025",
    categories: {
        assets: {
            investmentAccounts: {
                "401k": 45000,
                "Roth IRA": 20000,
                "Taxable Investments": 10000
            },
            realEstate: {
                "Primary Home": 320000,
                "Investment Property": 0
            },
            cash: {
                "Emergency Fund": 18000,
                "Checking Account": 5000,
                "High Yield Savings": 12000
            },
            other: {
                "Vehicle": 15000,
                "Personal Property": 25000
            }
        },
        liabilities: {
            mortgages: {
                "Primary Mortgage": 250000,
                "Investment Property Loan": 0
            },
            loans: {
                "Student Loan": 25000,
                "Auto Loan": 8000
            },
            creditCards: {
                "Credit Card": 8000
            },
            other: {
                "Personal Loan": 0
            }
        }
    },
    totals: {
        totalAssets: 435000,
        totalLiabilities: 291000,
        netWorth: 144000
    }
};

// Historical net worth entries showing progression
const netWorthHistory = [
    {
        date: "3/27/2025",
        entryId: "nw_20250327",
        assets: {
            investmentAccounts: 68000,
            realEstate: 315000,
            cash: 32000,
            other: 38000
        },
        liabilities: {
            mortgages: 258000,
            loans: 35000,
            creditCards: 12000,
            other: 0
        },
        totals: {
            totalAssets: 453000,
            totalLiabilities: 305000,
            netWorth: 148000
        }
    },
    {
        date: "6/27/2025",
        entryId: "nw_20250627",
        assets: {
            investmentAccounts: 72000,
            realEstate: 318000,
            cash: 34000,
            other: 37000
        },
        liabilities: {
            mortgages: 255000,
            loans: 31000,
            creditCards: 10000,
            other: 0
        },
        totals: {
            totalAssets: 461000,
            totalLiabilities: 296000,
            netWorth: 165000
        }
    },
    {
        date: "9/27/2025",
        entryId: "nw_20250927",
        assets: {
            investmentAccounts: 75000,
            realEstate: 320000,
            cash: 35000,
            other: 40000
        },
        liabilities: {
            mortgages: 250000,
            loans: 33000,
            creditCards: 8000,
            other: 0
        },
        totals: {
            totalAssets: 470000,
            totalLiabilities: 291000,
            netWorth: 179000
        }
    }
];

// Current net worth snapshot (latest entry)
const currentNetWorth = netWorthHistory[netWorthHistory.length - 1];

// Complete test data package
const testDataPackage = {
    currentPlayer: "TestUser",
    playerData: testUser,
    activeScenario: testScenario,
    scenarios: [testScenario],
    netWorthSetup: netWorthSetup,
    netWorthHistory: netWorthHistory,
    currentNetWorth: currentNetWorth
};

// Function to inject test data into localStorage
function injectTestData() {
    // Clear existing data
    localStorage.clear();

    // Set current user
    localStorage.setItem('fiquest_current_player', testDataPackage.currentPlayer);

    // Set user profile
    localStorage.setItem(`fiquest_player_${testDataPackage.currentPlayer.toLowerCase()}`,
                        JSON.stringify(testDataPackage.playerData));

    // Set active scenario
    localStorage.setItem('fiquest_active_scenario', JSON.stringify(testDataPackage.activeScenario));

    // Set scenarios list
    localStorage.setItem('fiquest_scenarios', JSON.stringify(testDataPackage.scenarios));

    // Set net worth data
    localStorage.setItem('fiquest_net_worth_setup', JSON.stringify(testDataPackage.netWorthSetup));
    localStorage.setItem('fiquest_net_worth_history', JSON.stringify(testDataPackage.netWorthHistory));
    localStorage.setItem('fiquest_current_net_worth', JSON.stringify(testDataPackage.currentNetWorth));

    console.log('Test data injected successfully');
    return testDataPackage;
}

// Export for use in other contexts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testDataPackage, injectTestData };
}