// Create a handler for the budget

let budgetHandler = (() => {

    // Code later

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
                itemAmount: document.querySelector(querySelectorOptions.amount).value
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
    // Step 1: get user input from the UI handler
    let addItem = () => {
        let userInput = ui.getData();
        console.log(userInput);
    };
    
    // Get all possible query selector options by calling the function in UI handler
    let selectorOptions = userInterfaceHandler.getQuerySelectorOptions();

    // There are two possible situations when items should be added: 1. when user clicks the add button.
    // 2. when user hit the return or enter key

    // Handle when user clicks the add button
    document.querySelector(selectorOptions.addItemButton).addEventListener('click', addItem);

    // Handle when user hit the enter or return key
    document.addEventListener('keypress', e => {
        e.keyCode === 13 ? addItem() : e.keyCode = e.keyCode;
    });

})(budgetHandler, userInterfaceHandler);

