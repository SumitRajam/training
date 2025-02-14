const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const filterForm = document.getElementById("filter-form") as HTMLFormElement;
const expenseList = document.getElementById("expense-list") as HTMLTableSectionElement;
const modalOverlays = document.querySelectorAll(".modal-overlay");
const addExpenseModal = document.getElementById("addExpenseModal") as HTMLElement;
const openModalBtn = document.querySelector(".add-expense-btn") as HTMLButtonElement;
const closeModalBtn = document.querySelector(".close-modal-btn") as HTMLButtonElement;

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

const renderExpenses = (filteredExpenses: Expense[] = expenses): void => {
    expenseList.innerHTML = "";
    filteredExpenses.forEach((expense) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="max-width: 200px; word-wrap: break-word; white-space: normal;">${expense.description}</td>
            <td>₹${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = parseInt((event.target as HTMLButtonElement).dataset.id || "0");
            deleteExpense(id);
        });
    });
};

const addExpense = (event: Event): void => {
    event.preventDefault();

    const description = (document.getElementById("description") as HTMLInputElement).value;
    const amount = parseFloat((document.getElementById("amount") as HTMLInputElement).value);
    const category = (document.getElementById("category") as HTMLSelectElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;

    if (!description || isNaN(amount) || amount <= 0 || !date) {
        alert("Please enter valid expense details.");
        return;
    }

    const newExpense: Expense = { id: Date.now(), description, amount, category, date };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
    closeModals();
};

const filterExpenses = (event: Event): void => {
    event.preventDefault();
    const category = (document.getElementById("filter-category") as HTMLSelectElement).value;
    const date = (document.getElementById("filter-date") as HTMLInputElement).value;

    let filtered = expenses.filter(expense =>
        (!category || expense.category === category) &&
        (!date || expense.date === date)
    );

    renderExpenses(filtered);
};

const deleteExpense = (id: number): void => {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
};

const closeModals = (): void => {
    addExpenseModal.style.display = "none";
};

const openModal = (): void => {
    addExpenseModal.style.display = "flex";
};

document.addEventListener("DOMContentLoaded", () => {
    renderExpenses();
    expenseForm.addEventListener("submit", addExpense);
    filterForm.addEventListener("submit", filterExpenses);
    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModals);

    addExpenseModal.addEventListener("click", (event) => {
        if (event.target === addExpenseModal) {
            closeModals();
        }
    });
});
