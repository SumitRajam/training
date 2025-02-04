class Employee {
    #salary;
    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary;
    };

    //getter to retrive private properties
    get salaryamount() {
        return this.#salary;
    };

    calculateBonus = function () {
        return this.#salary * 0.4;
    }

}

class Manager extends Employee {
    calculateBonus = function () {
        return this.salaryamount * 0.5;
    }
}

class Engineer extends Employee {
    calculateBonus = function () {
        return this.salaryamount * 0.2;
    }
}

class Intern extends Employee {
    calculateBonus = function () {
        return this.salaryamount;
    }
}

const manager001 = new Manager("Sam", 1, 800000);
const totalSalarySam = manager001.salaryamount + manager001.calculateBonus();

const engineer001 = new Engineer("Raj", 2, 515000);
const totalSalaryRaj = engineer001.salaryamount + engineer001.calculateBonus();

const intern001 = new Intern("Kabir", 3, 8000);
const totalSalaryKabir = intern001.salaryamount + intern001.calculateBonus();

console.log(`total salary of manager is ${totalSalarySam}`);
console.log(`total salary of engineer is ${totalSalaryRaj}`);
console.log(`total salary of intern is ${totalSalaryKabir}`);