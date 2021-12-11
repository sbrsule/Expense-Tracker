const incomeDisplay = document.getElementById("income-display");
const expenseDisplay = document.getElementById("expense-display");
const balanceDisplay = document.getElementById("balance-display");

const incomeArr = [12.00, 20.10];
const expenseArr = [13.22, 1.58];

updateDisplay();

// Functions
// Updates the display
function updateDisplay() {
	incomeDisplay.innerHTML = `$${incomeArr.reduce(add, 0).toFixed(2)}`;
	expenseDisplay.innerHTML = `$${expenseArr.reduce(add, 0).toFixed(2)}`;
	balanceDisplay.innerHTML = `$${(incomeArr.reduce(add, 0) - expenseArr.reduce(add, 0)).toFixed(2)}`;
}

// Reduce function to sum array
function add(accumulator, a) {
	return accumulator + a;
}
