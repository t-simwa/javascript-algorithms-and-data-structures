// Get the element with the ID "cart-container" which will be used to display the shopping cart section
const cartContainer = document.getElementById("cart-container");

// Get the element with the ID "products-container" where the list of products in the cart will be displayed
const productsContainer = document.getElementById("products-container");

// Get the element with the ID "dessert-card-container" which will hold all dessert cards dynamically generated
const dessertCards = document.getElementById("dessert-card-container");

// Get the button element with the ID "cart-btn" which toggles the visibility of the cart
const cartBtn = document.getElementById("cart-btn");

// Get the button element with the ID "clear-cart-btn" which clears all items from the cart when clicked
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get the element with the ID "total-items" which will display the total number of items in the cart
const totalNumberOfItems = document.getElementById("total-items");

// Get the element with the ID "subtotal" which will display the subtotal amount (total cost before taxes)
const cartSubTotal = document.getElementById("subtotal");

// Get the element with the ID "taxes" which will display the calculated tax amount for the cart
const cartTaxes = document.getElementById("taxes");

// Get the element with the ID "total" which will display the total cost including taxes
const cartTotal = document.getElementById("total");

// Get the span element inside the cart button with the ID "show-hide-cart" to toggle its text between "Show" and "Hide"
const showHideCartSpan = document.getElementById("show-hide-cart");

// Declare a boolean variable to track whether the cart is currently visible or hidden, initially set to false (hidden)
let isCartShowing = false;

// Define an array of product objects, each representing a dessert available for purchase
const products = [
    {
        id: 1, // Unique identifier for this product
        name: "Vanilla Cupcakes (6 Pack)", // Name of the dessert
        price: 12.99, // Price of the dessert
        category: "Cupcake", // Category to which the dessert belongs
    },
    {
        id: 2, // Unique identifier for this product
        name: "French Macaron", // Name of the dessert
        price: 3.99, // Price of the dessert
        category: "Macaron", // Category to which the dessert belongs
    },
    {
        id: 3, // Unique identifier for this product
        name: "Pumpkin Cupcake", // Name of the dessert
        price: 3.99, // Price of the dessert
        category: "Cupcake", // Category to which the dessert belongs
    },
    {
        id: 4, // Unique identifier for this product
        name: "Chocolate Cupcake", // Name of the dessert
        price: 5.99, // Price of the dessert
        category: "Cupcake", // Category to which the dessert belongs
    },
    {
        id: 5, // Unique identifier for this product
        name: "Chocolate Pretzels (4 Pack)", // Name of the dessert
        price: 10.99, // Price of the dessert
        category: "Pretzel", // Category to which the dessert belongs
    },
    {
        id: 6, // Unique identifier for this product
        name: "Strawberry Ice Cream", // Name of the dessert
        price: 2.99, // Price of the dessert
        category: "Ice Cream", // Category to which the dessert belongs
    },
    {
        id: 7, // Unique identifier for this product
        name: "Chocolate Macarons (4 Pack)", // Name of the dessert
        price: 9.99, // Price of the dessert
        category: "Macaron", // Category to which the dessert belongs
    },
    {
        id: 8, // Unique identifier for this product
        name: "Strawberry Pretzel", // Name of the dessert
        price: 4.99, // Price of the dessert
        category: "Pretzel", // Category to which the dessert belongs
    },
    {
        id: 9, // Unique identifier for this product
        name: "Butter Pecan Ice Cream", // Name of the dessert
        price: 2.99, // Price of the dessert
        category: "Ice Cream", // Category to which the dessert belongs
    },
    {
        id: 10, // Unique identifier for this product
        name: "Rocky Road Ice Cream", // Name of the dessert
        price: 2.99, // Price of the dessert
        category: "Ice Cream", // Category to which the dessert belongs
    },
    {
        id: 11, // Unique identifier for this product
        name: "Vanilla Macarons (5 Pack)", // Name of the dessert
        price: 11.99, // Price of the dessert
        category: "Macaron", // Category to which the dessert belongs
    },
    {
        id: 12, // Unique identifier for this product
        name: "Lemon Cupcakes (4 Pack)", // Name of the dessert
        price: 12.99, // Price of the dessert
        category: "Cupcake", // Category to which the dessert belongs
    },
];

// Iterate over the products array to dynamically create and display dessert cards in the dessertCards container
products.forEach(({ name, id, price, category }) => {
    // Append HTML for each dessert card, including product details and an "Add to cart" button
    dessertCards.innerHTML += `
    <div class="dessert-card"> <!-- Wrapper for each individual dessert card -->
      <h2>${name}</h2> <!-- Display the name of the dessert -->
      <p class="dessert-price">$${price}</p> <!-- Display the price of the dessert -->
      <p class="product-category">Category: ${category}</p> <!-- Display the dessert's category -->
      <button id="${id}" class="btn add-to-cart-btn">Add to cart</button> <!-- Button to add the dessert to the cart -->
    </div>
  `;
});

// Class for managing the shopping cart and related functionality
class ShoppingCart {
    constructor() {
        // Initialize the cart with an empty items array to hold added products
        this.items = [];
        // Initialize the total cart value to 0
        this.total = 0;
        // Set the tax rate for calculating taxes
        this.taxRate = 8.25;
    }

    // Function to add a product to the cart by its ID
    addItem(id, products) {
        // Find the product in the products array that matches the given ID
        const product = products.find((item) => item.id === id);

        // Destructure the product name and price for easier use
        const { name, price } = product;

        // Add the product to the items array
        this.items.push(product);

        // Create an object to count occurrences of each product in the cart
        const totalCountPerProduct = {};

        // Iterate over the items in the cart to populate the count object
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] =
                (totalCountPerProduct[dessert.id] || 0) + 1;
        });

        // Get the current count of the product being added
        const currentProductCount = totalCountPerProduct[product.id];

        // Get the span element that displays the product count for this product
        const currentProductCountSpan = document.getElementById(
            `product-count-for-id${id}`
        );

        // Check if the product is already in the cart
        if (currentProductCount > 1) {
            // Update the count span if the product is already in the cart
            currentProductCountSpan.textContent = `${currentProductCount}x`;
        } else {
            // Otherwise, add the product to the productsContainer with a new entry
            productsContainer.innerHTML += `
      <div id="dessert${id}" class="product"> <!-- Wrapper for the product entry -->
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name} <!-- Display the product count and name -->
        </p>
        <p>${price}</p> <!-- Display the product price -->
      </div>
      `;
        }
    }

    // Function to get the total count of items in the cart
    getCounts() {
        return this.items.length; // Return the number of items in the cart
    }

    // Function to clear all items from the cart
    clearCart() {
        // Check if the cart is already empty
        if (!this.items.length) {
            alert("Your shopping cart is already empty"); // Alert the user
            return; // Exit the function early
        }

        // Confirm with the user before clearing the cart
        const isCartCleared = confirm(
            "Are you sure you want to clear all items from your shopping cart?"
        );

        // If the user confirms, clear the cart
        if (isCartCleared) {
            this.items = []; // Reset the items array to empty
            this.total = 0; // Reset the total value to 0
            productsContainer.innerHTML = ""; // Clear the products container in the DOM
            totalNumberOfItems.textContent = 0; // Reset the displayed total item count
            cartSubTotal.textContent = 0; // Reset the displayed subtotal
            cartTaxes.textContent = 0; // Reset the displayed tax amount
            cartTotal.textContent = 0; // Reset the displayed total amount
        }
    }

    // Function to calculate taxes for a given amount
    calculateTaxes(amount) {
        // Calculate taxes as a percentage of the amount, rounded to two decimal places
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    // Function to calculate the total value of the cart, including taxes
    calculateTotal() {
        // Calculate the subtotal by summing up the prices of all items in the cart
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);

        // Calculate the tax amount based on the subtotal
        const tax = this.calculateTaxes(subTotal);

        // Calculate the final total by adding the subtotal and tax
        this.total = subTotal + tax;

        // Update the DOM elements with the calculated values
        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`; // Display the subtotal
        cartTaxes.textContent = `$${tax.toFixed(2)}`; // Display the tax amount
        cartTotal.textContent = `$${this.total.toFixed(2)}`; // Display the total amount

        // Return the total value
        return this.total;
    }
}

// Create a new instance of the ShoppingCart class
const cart = new ShoppingCart();

// Get all buttons with the "add-to-cart-btn" class
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

// Convert the HTMLCollection of buttons into an array and iterate over each button
[...addToCartBtns].forEach((btn) => {
    // Add a click event listener to each button
    btn.addEventListener("click", (event) => {
        // Call the addItem method to add the corresponding product to the cart
        cart.addItem(Number(event.target.id), products);

        // Update the total number of items displayed in the cart
        totalNumberOfItems.textContent = cart.getCounts();

        // Recalculate and display the total value of the cart
        cart.calculateTotal();
    });
});

// Add a click event listener to the cart toggle button
cartBtn.addEventListener("click", () => {
    // Toggle the visibility of the cart
    isCartShowing = !isCartShowing;

    // Update the text of the toggle button to reflect the current state
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";

    // Show or hide the cart
    cartContainer.style.display = isCartShowing ? "block" : "none"; // Set the display property based on visibility state
});

// Add a click event listener to the clear cart button
clearCartBtn.addEventListener("click", () => {
    cart.clearCart(); // Clear all items from the cart when the button is clicked
});
