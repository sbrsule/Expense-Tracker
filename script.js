const incomeDisplay = document.getElementById("income-display");
const expenseDisplay = document.getElementById("expense-display");
const balanceDisplay = document.getElementById("balance-display");
const submitBtn = document.getElementById("submit-btn");
const nameForm = document.getElementById("name");
const amountForm = document.getElementById("amount");
const descriptionForm = document.getElementById("description");
const transactionParent = document.getElementById("transactions");

const incomeArr = [];
const expenseArr = [];

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

// Event Listeners
submitBtn.addEventListener('click', e => {
	let newDiv = document.createElement("div");
	newDiv.innerHTML = `
		<div class="single-transaction" id="single-transaction">
			<p1>${nameForm.value}</p1>
			<p1>$${parseInt(amountForm.value).toFixed(2)}</p1>
		</div>
	`;
	transactionParent.appendChild(newDiv);
	incomeArr.push(parseInt(amountForm.value));
	updateDisplay();
});
