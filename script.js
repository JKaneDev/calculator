const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
const buttons = Array.from(document.querySelectorAll('.buttons')); 
const operators = Array.from(document.querySelectorAll('.operators'));
const clickAudio = new Audio('./sounds/clickAudio.mp3');

buttons.forEach(button => button.addEventListener('click', () => clickAudio.play()));
buttons.forEach(button => button.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operators')) {
        handleOperator(target.value);
        updateDisplay();
        console.table(calculator);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        console.table(calculator);
        return;
    }

    if(target.classList.contains('clear')) {
        clearDisplay();
        updateDisplay();
        console.table(calculator);
        return;
    }

    if (target.classList.contains('delete')) {
        console.table('delete', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
    console.table(calculator);
}))


function updateDisplay() {
    const display = document.getElementById('display');
    display.value = calculator.displayValue;
}
updateDisplay(); 

function clearDisplay() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function deleteDigit(event, erase, display) {}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue == '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(decimal) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
    }

    if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
    }

}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function operate(firstOperand, secondOperand, operator) {
    switch (true) {
        case (operator === '+'):
            return firstOperand + secondOperand;
        case (operator === '-'):
            return firstOperand - secondOperand;
        case (operator === 'x'):
            return firstOperand * secondOperand;
        case (operator === '/'):
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

/* TODO:
 - DONE! Create inputDigit function, when user clicks on a digit, display value is updated
 - DONE! Create inputDecimal function, is added unless one already exists in display
 - DONE! Create handleOperator function, takes nextOperator
    - DONE! displayValue should be stored under firstOperand
    - DONE! operator property should be updated with whatever operator was clicked
    - DONE! When operator is clicked, displayValue is converted to floating point 
    - DONE! waitingForSecondOperand is set to true
    - Whatever digits the user enters next will constitute second operand
 - DONE! Amend inputDigit: if waitingForSecondOperand = true:
    - DONE! displayValue is overwritten with the digit that was clicked
- DONE! When second operand has been entered and operator is clicked:
    - DONE! Calculation thus far is evaluated and displayed (operate function)
- DONE! Update handleOperator, check if operator has been assigned an operator
    - DONE! If so, operate, save result in result variable, displayValue = result
    - DONE! firstOperand = result so it can be used in further calculation
    - DONE! If operator and waitingForSecondOperand, operator = nextOperator, return
- DONE! Reset Calculator function, set all calculator values to original values
    - DONE! Replace event listener callback with reset function
- Fix decimal bug, amend input decimal function
    - if waitingForSecondOperand is true & decimal is entered, displayValue = 0,
    - waitingForSecondOperand = false
- Refactor button event listeners to one switch block
- Update handleOperator to handle FP imprecision with parseFloat & toFixed()

*/