interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface Manager extends Employee {
    teamSize: number;
}

class Department {
    private employees: Employee[] = [];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    removeEmployee(id: number): void {
        this.employees = this.employees.filter(employee => employee.id !== id);
    }

    getTotalSalary(): number {
        return this.employees.reduce((sum, employee) => sum + employee.salary, 0);
    }

    listEmployees(): void {
        this.employees.forEach(employee => {
            console.log(employee);  // Logging only one employee at a time
        });
    }
}

function updateSalary<T extends Employee>(employee: T, newSalary: number): T {
    return { ...employee, salary: newSalary };
}

// Creating Employees
const emp1: Employee = { id: 1, name: "Sumit", position: "Engineer", salary: 32000 };
const emp2: Employee = { id: 2, name: "Manav", position: "Developer", salary: 45000 };
const manager: Manager = { id: 3, name: "Durgesh", position: "Team Lead", salary: 60000, teamSize: 5 };

const department = new Department([emp1, emp2, manager]);

const emp3: Employee = { id: 4, name: "Seema", position: "Trainee", salary: 10000 };

console.log("Initial Employees:");
department.listEmployees();

console.log("\nAdding a new employee (Seema):");
department.addEmployee(emp3);
department.listEmployees();

console.log("\nTotal Salary:", department.getTotalSalary());

console.log("\nUpdating Salary of Manav to 50000:");
const updatedEmp2 = updateSalary(emp2, 50000);
console.log(updatedEmp2);

console.log("\nRemoving (Seema):");
department.removeEmployee(4);
department.listEmployees();

console.log("\nGeneric Class:\n");
class GenericStorage<T extends { id: number }> {
    private items: T[] = [];

    constructor(items: T[] = []) {
        this.items = items;
    }

    add(item: T): void {
        this.items.push(item);
        console.log(`Added ${JSON.stringify(item)} successfully`);
    }

    remove(item: T): void {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log(`Removed ${JSON.stringify(item)} successfully`);
        } else {
            console.log(`Item ${JSON.stringify(item)} not found`);
        }
    }

    getAll(): T[] {
        return this.items;
    }
}

const department1 = new GenericStorage<Employee>([emp1, emp2]);

console.log("All items:", department1.getAll());

department1.add(emp3);
console.log("All items after adding Seema:", department1.getAll());

department1.remove(emp3);
console.log("All items after removing Seema:", department1.getAll());