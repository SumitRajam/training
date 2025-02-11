/*
## Vehicle Rental System

    Create Vehicle class with brand, model, rentPricePerDay.
    Subclasses: Car, Bike, Truck.
    Polymorphism: Implement calculateRentalCost(days).
*/

class Vehicle {
    brand: string;
    model: string;
    rentPricePerDay: number;

    constructor(brand: string, model: string, rentalPricePerDay: number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentalPricePerDay;
    }
}

class Car extends Vehicle {
    constructor(brand: string, model: string, rentalPricePerDay: number) {
        super(brand, model, rentalPricePerDay);
    }


    calculateRentalCost(days: number): number {
        console.log(`Calculating rental cost for a Car: ${this.brand} ${this.model}`);
        return this.rentPricePerDay * days;
    }
}

class Bike extends Vehicle {
    constructor(brand: string, model: string, rentalPricePerDay: number) {
        super(brand, model, rentalPricePerDay);
    }

    calculateRentalCost(days: number): number {
        console.log(`Calculating rental cost for a Bike: ${this.brand} ${this.model}`);
        return this.rentPricePerDay * days;
    }
}

class Truck extends Vehicle {
    constructor(brand: string, model: string, rentalPricePerDay: number) {
        super(brand, model, rentalPricePerDay);
        this.rentPricePerDay = 4000;
    }

    calculateRentalCost(days: number): number {
        console.log(`Calculating rental cost for a Truck: ${this.brand} ${this.model}`);
        return this.rentPricePerDay * days;
    }
}

const car = new Car("Toyota", "Corolla", 2500);
console.log("Car rent for 5 days:", car.calculateRentalCost(5));

const bike = new Bike("Honda", "CBR", 1000);
console.log("Bike rent for 5 days:", bike.calculateRentalCost(5));

const truck = new Truck("Ford", "F-150", 4000);
console.log("Truck rent for 5 days:", truck.calculateRentalCost(5));
