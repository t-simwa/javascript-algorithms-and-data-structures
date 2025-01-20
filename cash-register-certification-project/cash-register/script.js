// Declare a variable 'price' and assign it the value 3.26. 
// This represents the price of the item that the customer is purchasing.
let price = 3.26;

// Declare a variable 'cid' and assign it an array of arrays. 
// Each sub-array represents a currency denomination and its total value in dollars.
let cid = [
    ['PENNY', 1.01],  // 1.01 dollars in pennies
    ['NICKEL', 2.05], // 2.05 dollars in nickels
    ['DIME', 3.1],    // 3.1 dollars in dimes
    ['QUARTER', 4.25],// 4.25 dollars in quarters
    ['ONE', 90],      // 90 dollars in ones
    ['FIVE', 55],     // 55 dollars in fives
    ['TEN', 20],      // 20 dollars in tens
    ['TWENTY', 60],   // 60 dollars in twenties
    ['ONE HUNDRED', 100] // 100 dollars in one hundred bills
];

// Select the HTML element with the ID 'change-due' and store it in a constant. 
// This will be used to display the status and change due to the customer.
const displayChangeDue = document.getElementById('change-due');

// Select the HTML element with the ID 'cash' and store it in a constant. 
// This represents the input field where the customer enters the amount of cash they are paying.
const cash = document.getElementById('cash');

// Select the HTML element with the ID 'purchase-btn' and store it in a constant. 
// This represents the button that the customer clicks to complete the purchase.
const purchaseBtn = document.getElementById('purchase-btn');

// Select the HTML element with the ID 'price-screen' and store it in a constant. 
// This represents the element where the price of the item is displayed.
const priceScreen = document.getElementById('price-screen');

// Select the HTML element with the ID 'cash-drawer-display' and store it in a constant. 
// This will be used to display the current cash in the drawer.
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

// Define a function 'formatResults' that formats the results and displays the status and change due to the customer.
// The function takes two parameters: 'status' (the status of the transaction) and 'change' (an array of the change to be returned).
const formatResults = (status, change) => {
    // Set the inner HTML of the 'displayChangeDue' element to show the status of the transaction.
    displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;

    // For each denomination and amount in the 'change' array, display the denomination and amount in a paragraph.
    // Use 'map' to transform each element of the 'change' array into HTML paragraphs, then join them into a single string.
    displayChangeDue.innerHTML += change
        .map(
            ([denominationName, amount]) => `<p>${denominationName}: $${amount}</p>`
        )
        .join('');
};

// Define a function 'checkCashRegister' that checks the cash register and calculates the change due to the customer.
const checkCashRegister = () => {
    // Convert the value entered by the customer (in 'cash.value') into cents by multiplying by 100 and rounding to the nearest integer.
    const cashInCents = Math.round(Number(cash.value) * 100);

    // Convert the price of the item into cents by multiplying by 100 and rounding to the nearest integer.
    const priceInCents = Math.round(price * 100);

    // If the customer doesn't have enough money to purchase the item, show an alert and clear the input field.
    if (cashInCents < priceInCents) {
        alert('Customer does not have enough money to purchase the item');
        cash.value = ''; // Clear the cash input field
        return; // Exit the function
    }

    // If the customer has paid exactly the price of the item, display a message indicating no change is due.
    if (cashInCents === priceInCents) {
        displayChangeDue.innerHTML =
            '<p>No change due - customer paid with exact cash</p>';
        cash.value = ''; // Clear the cash input field
        return; // Exit the function
    }

    // Calculate the change due by subtracting the price from the cash paid.
    let changeDue = cashInCents - priceInCents;

    // Reverse the 'cid' array and convert each denomination's amount to cents by multiplying by 100 and rounding.
    const reversedCid = [...cid]
        .reverse()
        .map(([denominationName, amount]) => [
            denominationName,
            Math.round(amount * 100) // Convert amount to cents
        ]);

    // Define an array of denominations in cents, ordered from largest to smallest.
    const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

    // Initialize an object 'result' to store the transaction status and the change due.
    const result = { status: 'OPEN', change: [] };

    // Calculate the total amount of cash in the drawer (in cents).
    const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);

    // If the total cash in the drawer is less than the change due, display an 'INSUFFICIENT_FUNDS' message.
    if (totalCID < changeDue) {
        displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return; // Exit the function
    }

    // If the total cash in the drawer equals the change due, mark the status as 'CLOSED'.
    if (totalCID === changeDue) {
        result.status = 'CLOSED';
    }

    // Loop through the reversed denominations to calculate the change due for each denomination.
    for (let i = 0; i <= reversedCid.length; i++) {
        // If the change due is greater than or equal to the current denomination and there is still change to give, calculate the change.
        if (changeDue >= denominations[i] && changeDue > 0) {
            const [denominationName, total] = reversedCid[i]; // Get the denomination name and total amount
            const possibleChange = Math.min(total, changeDue); // Calculate the possible change (the minimum of the total and the remaining change)
            const count = Math.floor(possibleChange / denominations[i]); // Calculate the number of bills/coins of the current denomination
            const amountInChange = count * denominations[i]; // Calculate the amount in change for the current denomination
            changeDue -= amountInChange; // Subtract the change given from the remaining change due

            // If at least one bill/coin of the current denomination is given, add it to the result.
            if (count > 0) {
                result.change.push([denominationName, amountInChange / 100]); // Store the denomination and amount in dollars
            }
        }
    }

    // If there is still remaining change due, display an 'INSUFFICIENT_FUNDS' message.
    if (changeDue > 0) {
        displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return; // Exit the function
    }

    // Format and display the results (status and change) after calculating the change.
    formatResults(result.status, result.change);
    // Update the user interface with the new change in the drawer.
    updateUI(result.change);
};

// Define a function 'checkResults' that checks if the customer has entered cash and, if so, checks the cash register.
const checkResults = () => {
    // If the 'cash' input field is empty, return without doing anything.
    if (!cash.value) {
        return; // Exit the function
    }
    // Call the 'checkCashRegister' function to check the cash register and calculate the change.
    checkCashRegister();
};

// Define a function 'updateUI' that updates the user interface with the latest change information.
const updateUI = change => {
    // Create an object 'currencyNameMap' to map the denomination names to their full names.
    const currencyNameMap = {
        PENNY: 'Pennies',
        NICKEL: 'Nickels',
        DIME: 'Dimes',
        QUARTER: 'Quarters',
        ONE: 'Ones',
        FIVE: 'Fives',
        TEN: 'Tens',
        TWENTY: 'Twenties',
        'ONE HUNDRED': 'Hundreds'
    };

    // If change is passed in, update the cash in the drawer by subtracting the change given.
    if (change) {
        change.forEach(([changeDenomination, changeAmount]) => {
            // Find the target denomination in the 'cid' array and update its value by subtracting the change given.
            const targetArr = cid.find(
                ([denominationName]) => denominationName === changeDenomination
            );
            targetArr[1] =
                (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100; // Update the amount in the drawer
        });
    }

    // Clear the cash input field.
    cash.value = '';

    // Update the price screen to display the total price.
    priceScreen.textContent = `Total: $${price}`;

    // Update the cash drawer display with the current change in the drawer, formatted as a list of denominations.
    cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
            .map(
                ([denominationName, amount]) =>
                    `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
            )
            .join('')}
  `;
};

// Add an event listener to the 'purchaseBtn' button. When clicked, call the 'checkResults' function.
purchaseBtn.addEventListener('click', checkResults);

// Add an event listener to the 'cash' input field. When the 'Enter' key is pressed, call the 'checkResults' function.
cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        checkResults();
    }
});

// Call the 'updateUI' function to initialize the UI with the current cash in the drawer and the price of the item.
updateUI();
