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

    let calculateTotal = function (type) {
        if (type === 'income') {
            // Calculate total income 
                let total = 0;
                income.forEach(current => total += current.incomeAmount);
               // console.log(income);
                return totalIncome = total;
            
        } else if (type === 'expense') {
            // Calculate total expenses
                let total = 0;
                expense.forEach(current => total += current.expenseAmount);
                return totalExpenses = total;
            

        }

    }

    let availableBalance = 0;
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
        updateBudget: function () {
            availableBalance = calculateTotal('income') - calculateTotal('expense');
            return availableBalance;
        },
        getTotalIncome: function(){
            return totalIncome;
        },
        getTotalExpenses: function(){
            return totalExpenses;
        },
        testing: function () {
            // console.log(income);
            // console.log(expense);
            console.log(totalIncome);
            console.log(totalExpenses);
            console.log(availableBalance);
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
        addItemButton: '.add-item-button',
        listOfIncome: '.list-of-income',
        listOfExpenses: '.list-of-expenses',
        moneyIn: '.money-in',
        moneyOut: '.money-out',
        totalBalance: '.total-balance'
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
        },
        // Update UI after adding a new item, either an income item or an expense item
        addNewItemOnUI: (type, newItem) => {
            // Insert HTML elements to update UI after adding each item
            let htmlInsertion;
            let updatedHTML;
            let htmlElementToInsert;
            if (type === 'income') {
                htmlInsertion = '<div class="item clearfix" id="income-%incomeID%"><div class="item__description">%incomeDetail%</div><div class="right clearfix"><div class="item__value">%incomeAmount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                // Replace changeable fields with user input values
                updatedHTML = htmlInsertion.replace('%incomeID%', newItem.incomeID);
                updatedHTML = updatedHTML.replace('%incomeDetail%', newItem.incomeDetail);
                updatedHTML = updatedHTML.replace('%incomeAmount%', newItem.incomeAmount);
                // Select the right HTML element 
                htmlElementToInsert = querySelectorOptions.listOfIncome;
                // Insert each newly added item at the end of the list but before the end of the income section
                document.querySelector(htmlElementToInsert).insertAdjacentHTML('beforeend', updatedHTML);
            } else if (type === 'expense') {
                htmlInsertion = '<div class="item clearfix" id="expense-%expenseID%"><div class="item__description">%expenseDetail%</div><div class="right clearfix"><div class="item__value">%expenseAmount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                // Replace changeable fields with user input values
                updatedHTML = htmlInsertion.replace('%expenseID%', newItem.expenseID);
                updatedHTML = updatedHTML.replace('%expenseDetail%', newItem.expenseDetail);
                updatedHTML = updatedHTML.replace('%expenseAmount%', newItem.expenseAmount);
                // Select the right HTML element 
                htmlElementToInsert = querySelectorOptions.listOfExpenses;
                // Insert each newly added item at the end of the list but before the end of the income section
                document.querySelector(htmlElementToInsert).insertAdjacentHTML('beforeend', updatedHTML);
            }
        },
        // Reset user input to empty or 0 after adding an item
        resetUserInput: () => {
            let userInputFields = document.querySelectorAll(querySelectorOptions.detail + ',' + querySelectorOptions.amount);
            let userInputFieldsArray = Array.from(userInputFields);
            userInputFieldsArray.forEach(current => current.value = '');
            // Refocus on the item detail to start entering the next item
            userInputFieldsArray[0].focus();
        },
        // Update money in, money out, and total balance on UI
        updateBalanceOnUI: () => {
            let totalIncome = budgetHandler.getTotalIncome();
            let totalExpenses = budgetHandler.getTotalExpenses();
            let totalBalance = budgetHandler.updateBudget();
            // Update total income
            document.querySelector(querySelectorOptions.moneyIn).textContent = totalIncome;
            // Update total expenses 
            document.querySelector(querySelectorOptions.moneyOut).textContent = totalExpenses;
            // Update total available budget
            document.querySelector(querySelectorOptions.totalBalance).textContent = totalBalance;
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
            newItemAdded = budgetData.addItem(userInput.itemType, userInput.itemDetail, userInput.itemAmount);
            // Step 3: update the newly added item on UI
            ui.addNewItemOnUI(userInput.itemType, newItemAdded);
            // Step 4: reset all user input fields for the next new item
            ui.resetUserInput();
            // Step 5: calculate and update the budget based on the new item added
            //budgetHandler.calculateTotal('income');
            budgetData.updateBudget();
            // Step 6: update balance on UI
            ui.updateBalanceOnUI();
            // Step 7: calculate and update the percentage of expense/income 
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
