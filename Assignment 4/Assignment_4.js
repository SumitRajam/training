// ** Assignment 4: Working with map(), filter(), and ** reduce()
// Task 1: Use map() to transform data
// Create an array of product objects with properties name, price, and category.
// Use map() to create a new array with product names in uppercase.
//     Task 2: Use filter() to extract specific data
// Use filter() to create an array of products that belong to the 'Electronics' category.
//     Task 3: Use reduce() to calculate a total
// Use reduce() to calculate the total price of all products in the array.
//     Task 4: Combine map(), filter(), and reduce()
// Create a function that calculates the total price of products from a specific category using map(), filter(), and reduce().

const products = [
    { name: "Laptop", price: 800, category: "Electronics" },
    { name: "Smartphone", price: 600, category: "Electronics" },
    { name: "Shoes", price: 120, category: "Fashion" },
    { name: "T-Shirt", price: 40, category: "Fashion" },
    { name: "Headphones", price: 150, category: "Electronics" },
    { name: "Washing Machine", price: 500, category: "Appliances" }
];

const productNames = products.map(product => product.name.toUpperCase())
console.log(productNames)

const electronicsProducts = products.filter(product => product.category === "Electronics");
console.log("Electronics Products:", electronicsProducts);

const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log("Total Price of All Products:", totalPrice);

function categoryTotalPrice(category) {
    return products.filter(product => product.category === category)
        .map(product => product.price)
        .reduce((sum, price) => sum + price, 0);
}

console.log("Total Price of Electronics:", categoryTotalPrice("Electronics"));
console.log("Total Price of Fashion:", categoryTotalPrice("Fashion"));