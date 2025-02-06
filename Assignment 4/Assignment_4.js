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
