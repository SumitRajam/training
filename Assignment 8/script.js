var expenseForm = document.getElementById("expense-form");
var filterForm = document.getElementById("filter-form");
var expenseList = document.getElementById("expense-list");
var modalOverlays = document.querySelectorAll(".modal-overlay");
var addExpenseModal = document.getElementById("addExpenseModal");
var openModalBtn = document.querySelector(".add-expense-btn");
var closeModalBtn = document.querySelector(".close-modal-btn");
var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
var renderExpenses = function (filteredExpenses) {
    if (filteredExpenses === void 0) { filteredExpenses = expenses; }
    expenseList.innerHTML = "";
    filteredExpenses.forEach(function (expense) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td style=\"max-width: 200px; word-wrap: break-word; white-space: normal;\">".concat(expense.description, "</td>\n            <td>\u20B9").concat(expense.amount, "</td>\n            <td>").concat(expense.category, "</td>\n            <td>").concat(expense.date, "</td>\n            <td>\n                <button class=\"btn btn-danger btn-sm delete-btn\" data-id=\"").concat(expense.id, "\">Delete</button>\n            </td>\n        ");
        expenseList.appendChild(row);
    });
    document.querySelectorAll(".delete-btn").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var id = parseInt(event.target.dataset.id || "0");
            deleteExpense(id);
        });
    });
};
var addExpense = function (event) {
    event.preventDefault();
    var description = document.getElementById("description").value;
    var amount = parseFloat(document.getElementById("amount").value);
    var category = document.getElementById("category").value;
    var date = document.getElementById("date").value;
    if (!description || isNaN(amount) || amount <= 0 || !date) {
        alert("Please enter valid expense details.");
        return;
    }
    var newExpense = { id: Date.now(), description: description, amount: amount, category: category, date: date };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
    closeModals();
};
var filterExpenses = function (event) {
    event.preventDefault();
    var category = document.getElementById("filter-category").value;
    var date = document.getElementById("filter-date").value;
    var filtered = expenses.filter(function (expense) {
        return (!category || expense.category === category) &&
            (!date || expense.date === date);
    });
    renderExpenses(filtered);
};
var deleteExpense = function (id) {
    expenses = expenses.filter(function (expense) { return expense.id !== id; });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
};
var closeModals = function () {
    addExpenseModal.style.display = "none";
};
var openModal = function () {
    addExpenseModal.style.display = "flex";
};
document.addEventListener("DOMContentLoaded", function () {
    renderExpenses();
    expenseForm.addEventListener("submit", addExpense);
    filterForm.addEventListener("submit", filterExpenses);
    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModals);
    addExpenseModal.addEventListener("click", function (event) {
        if (event.target === addExpenseModal) {
            closeModals();
        }
    });
});
