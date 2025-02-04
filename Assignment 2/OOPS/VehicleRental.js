class Vehicle {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = 2000;
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand, model);
        this.rentPricePerDay = 3000;
    }

    // polymorphism
    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Bike extends Vehicle {
    constructor(brand, model) {
        super(brand, model);
        this.rentPricePerDay = 500;
    }

    // polymorphism
    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Truck extends Vehicle {
    constructor(brand, model) {
        super(brand, model);
        this.rentPricePerDay = 4000;
    }

    // polymorphism
    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}


const car = new Car("Toyota", "Corolla");
console.log("Car rent for 5 days:", car.calculateRentalCost(5));

const bike = new Bike("Honda", "CBR");
console.log("Bike rent for 3 days:", bike.calculateRentalCost(5));

const truck = new Truck("Ford", "F-150");
console.log("Truck rent for 7 days:", truck.calculateRentalCost(5));
