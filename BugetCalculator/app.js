// Create a handler for the budget
let budgetHandler = (() => {
    // Create a class for income 
    class Income {
        constructor(incomeID, incomeDetail, incomeAmount) {
            this.incomeID = incomeID;
            this.incomeDetail = incomeDetail;
            this.incomeAmount = incomeAmount;
        }
    }

    // Create a class for expenses
    class Expense {
        constructor(expenseID, expenseDetail, expenseAmount) {
            this.expenseID = expenseID;
            this.expenseDetail = expenseDetail;
            this.expenseAmount = expenseAmount;
        }

    }
    // Store income and expenses into arrays
    let income = [];
    let expense = [];

    // Create changeable variables for total income, total expenses, and available balance, and percentage of expense/income
    let totalIncome = 0;
    let totalExpenses = 0;
    let availableBalance = totalIncome - totalExpenses;
    let percentageIncomeSpent = (totalExpenses / totalIncome) * 100;
    return {
        addItem: function (type, detail, amount) {
            if (type === 'income') { // Add an income item
                let newIncomeID;
                let newIncomeItem;
                // If the array is empty, then ID = 0; if not, then ID equals the ID of the last item plus 1
                if (income.length > 0) {
                    newIncomeID = income[income.length - 1].incomeID + 1;
                } else {
                    newIncomeID = 0;
                };
                newIncomeItem = new Income(newIncomeID, detail, amount);
                income.push(newIncomeItem);
                return newIncomeItem;

            } else if (type === 'expense') { // Add an expense item
                let newExpenseID;
                let newExpenseItem;
                // If the array is empty, then ID = 0; if not, then ID equals the ID of the last item plus 1
                if (expense.length > 0) {
                    newExpenseID = expense[expense.length - 1].expenseID + 1;
                } else {
                    newExpenseID = 0;
                };
                newExpenseItem = new Expense(newExpenseID, detail, amount);
                expense.push(newExpenseItem);
                return newExpenseItem;
            }
        },
        testing: function () {
            console.log(income);
            console.log(expense);
        }
    }

})();

// Create a handler for the user interface

let userInterfaceHandler = (() => {

    // Create a list of HTML classes so that in case there is a change in the name of a class, the code
    // associated with that class in the entire project name will be dynmatically and automatically changed

    let querySelectorOptions = {
        type: '.item-type',
        detail: '.detail',
        amount: '.amount',
        addItemButton: '.add-item-button'
    };

    // Get user input value from UI
    return {
        getData: () => {
            return {
                itemType: document.querySelector(querySelectorOptions.type).value,
                itemDetail: document.querySelector(querySelectorOptions.detail).value,
                itemAmount: Math.round(document.querySelector(querySelectorOptions.amount).value)
            };
        },
        // appController will be able to use the querySelectionOptions by making them public here
        getQuerySelectorOptions: () => {
            return querySelectorOptions;
        }
    };

})();

// Create an app controller that interacts with both data and UI
let appController = ((budgetData, ui) => {
    // Create a function to add item
    let addNewItem = () => {
        // Step 1: get user input from the UI handler
        let userInput = ui.getData();
        console.log(userInput);
        let newItemAdded;
        // Step 2: add user input or the new item to the budget
        // Only add if all input fields are filled out, and amount should be great than 0 
        if (userInput.itemAmount > 0 && userInput.itemDetail !== "" && !isNaN(userInput.itemAmount)) {
            newItemAdded = budgetHandler.addItem(userInput.itemType, userInput.itemDetail, userInput.itemAmount);
            // Step 3: update the newly added item on UI

            // Step 4: clear all input fields for the next new item
            // Step 5: calculate and update the budget based on the new item added
            // Step 6: calculate and update the percentage of expense/income 

        }

    };
    return {
        // Initialize the app when user start using the app
        init: () => {
            // Get all possible query selector options by calling the function in UI handler
            let selectorOptions = userInterfaceHandler.getQuerySelectorOptions();

            // There are two possible situations when items should be added: 1. when user clicks the add button.
            // 2. when user hit the return or enter key

            // Handle when user clicks the add button
            document.querySelector(selectorOptions.addItemButton).addEventListener('click', addNewItem);

            // Handle when user hit the enter or return key
            document.addEventListener('keypress', e => {
                e.keyCode === 13 ? addNewItem() : e.keyCode = e.keyCode;
            });
        }
    }

})(budgetHandler, userInterfaceHandler);

appController.init();
