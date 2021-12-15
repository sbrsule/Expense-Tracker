const incomeDisplay = document.getElementById("income-display");
const expenseDisplay = document.getElementById("expense-display");
const balanceDisplay = document.getElementById("balance-display");
const submitBtn = document.getElementById("submit-btn");
const nameForm = document.getElementById("name");
const amountForm = document.getElementById("amount");
const descriptionForm = document.getElementById("description");
const transactionParent = document.getElementById("transactions");
const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");

const incomeArr = [];
const expenseArr = [];

updateDisplay();

// Transaction class
class Transaction {
	constructor(name, amount, description = null) {
		this.name = name;
		this.amount = amount;
		this.description = description;
	}
}

const transactionArr = [];

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

// Format amount input
$("input[data-type='currency']").on({
	keyup: function() {
		formatCurrency($(this));
	},
	blur: function() {
		formatCurrency($(this), "blur");
	}
});

function formatNumber(n) {
	return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
	var input_val = input.val();
	if (input_val === "") { return; }
	var original_len = input_val.length;
	var caret_pos = input.prop("selectionStart");
	if (input_val.indexOf(".") >= 0) {
		var decimal_pos = input_val.indexOf(".");
		var left_side = input_val.substring(0, decimal_pos);
		var right_side = input_val.substring(decimal_pos);
		left_side = formatNumber(left_side);
		right_side = formatNumber(right_side);
		if (blur === "blur") {
			right_side += "00";
		}
		right_side = right_side.substring(0, 2);
		input_val = "$" + left_side + "." + right_side;
	}
	else {
		input_val = formatNumber(input_val);
		input_val = "$" + input_val;
		if (blur === "blur") {
			input_val += ".00";
		}
	}
	input.val(input_val);
	var updated_len = input_val.length;
	caret_pos = updated_len - original_len + caret_pos;
	input[0].setSelectionRange(caret_pos, caret_pos);
}
// Event Listeners
submitBtn.addEventListener('click', e => {
	console.log(amountForm.value);
	if (!amountForm.value.trim()) {
        	amountForm.placeholder = 'Please Enter an Amount';
        	amountForm.classList.add('error-text');
        }

	if (!nameForm.value.trim()) {
        	nameForm.placeholder = 'Please Enter a Name';
        	nameForm.classList.add('error-text');
        }

	if (amountForm.value.trim() && nameForm.value.trim()) { 
		let newDiv = document.createElement("div");
		newDiv.classList.add("single-transaction");
		newDiv.setAttribute('id','single-transaction');
		let name = nameForm.value;
		if (name.length > 10) {
			name = name.substring(0,6) + "...";
		}

		let amount = parseFloat(amountForm.value.substring(1)); // Removes the '$' from amount and converts from string to float
		console.log(amount);
		let description = descriptionForm.value;
		if (description.length > 30) {
			description = description.substring(0, 26) + "...";
		}
		
		if (addBtn.classList.contains('selected')) {
			incomeArr.push(amount);
			console.log(incomeArr);
			newDiv.innerHTML = `
                        		<p1>${name}</p1>
                        		<p1>+$${amount.toFixed(2)}</p1>
                        		<p1>${description}</p1>
                        `;
			newDiv.classList.add('add');
		}

		else if (subtractBtn.classList.contains('selected')) {
			expenseArr.push(amount);
			console.log(expenseArr);
			newDiv.innerHTML = `
                        		<p1>${name}</p1>
                        		<p1>-$${amount.toFixed(2)}</p1>
                        		<p1>${description}</p1>
                        `;
			newDiv.classList.add('subtract');
		}

		transactionParent.appendChild(newDiv);
		nameForm.value = amountForm.value = descriptionForm.value = "";
		amountForm.classList.remove('error-text');
		amountForm.placeholder = '';
		nameForm.classList.remove('error-text');
		nameForm.placeholder = '';
		updateDisplay();
	}
});

addBtn.addEventListener('click', e => {
	subtractBtn.classList.remove('selected');
	addBtn.classList.add('selected');
});

subtractBtn.addEventListener('click', e => {
	addBtn.classList.remove('selected');
	subtractBtn.classList.add('selected');
});
