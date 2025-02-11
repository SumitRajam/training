/* ## Employee Management System
    Create Employee class with name, id, #salary.
    Subclasses: Manager, Engineer, Intern.
    Polymorphism: Override calculateBonus() for each role. */

class Employee {
    name: string;
    id: number;
    private salary: number;

    constructor(name: string, id: number, salary: number = 10000) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }
    calculateBonus(bonus: number): number {
        console.log("Please justify role by using subclasses of Employee and call this method on them.");
        return 0;
    }
}

class Manager extends Employee {
    constructor(name: string, id: number, salary: number) {
        super(name, id, salary);
    }

    calculateBonus(bonus: number): number {
        return this.getSalary() * bonus + 3000; //extra 3000 bonus
    }
}

class Engineer extends Employee {
    constructor(name: string, id: number, salary: number) {
        super(name, id, salary);
    }

    calculateBonus(bonus: number): number {
        return this.getSalary() * bonus;
    }
}

class Intern extends Employee {
    constructor(name: string, id: number) {
        super(name, id, 5000);
    }

    calculateBonus(bonus: number): number {
        return 0; //no bonus for intern
    }
}

const manager_1 = new Manager("Sumit", 1, 30000);
console.log(`Salary of manager ${manager_1.name}: ${manager_1.getSalary()}`);
console.log(`Bonus :${manager_1.calculateBonus(0.25)}`);

const engineer_1 = new Engineer("Manav", 1, 20000);
console.log(`Salary of engineer ${engineer_1.name}: ${engineer_1.getSalary()}`);
console.log(`Bonus :${engineer_1.calculateBonus(0.2)}`);

const intern_1 = new Intern("Kaiwalya", 1);
console.log(`Salary of intern ${intern_1.name}: ${intern_1.getSalary()}`);
console.log(`Bonus : ${intern_1.calculateBonus(0.15)}`);