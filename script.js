const calculator = {
    displayValue: 0,
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
const buttons = Array.from(document.querySelectorAll('.buttons')); 
const clickAudio = new Audio('./sounds/clickAudio.mp3');

buttons.forEach(button => button.addEventListener('click', () => clickAudio.play()));
buttons.forEach(button => button.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operators')) {
        console.log('operators', target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('clear')) {
        console.log('clear', target.value);
        return;
    }

    if (target.classList.contains('delete')) {
        console.log('delete', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
}))


function updateDisplay() {
    const display = document.getElementById('display');
    display.value = calculator.displayValue;
}

updateDisplay(); 

function clearDisplay(event, clear, display, runningCalc) {}

function deleteDigit(event, erase, display) {}

function inputDigit(digit) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue == '0' ? digit : displayValue + digit;
}

function inputDecimal(decimal) {
     if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
     }
}

/* TODO:
 - DONE! Create inputDigit function, when user clicks on a digit, display value is updated
 - Create inputDecimal function, is added unless one already exists in display
 - Create handleOperator function, takes nextOperator
    - displayValue should be stored under firstOperand
    - operator property should be updated with whatever operator was clicked
    - When operator is clicked, displayValue is converted to floating point 
    - waitingForSecondOperand is set to true
    - Whatever digits the user enters next will constitute second operand
 - Amend inputDigit: if waitingForSecondOperand = true:
    - displayValue is overwritten with the digit that was clicked
- When second operand has been entered and operator is clicked:
    - Calculation thus far is evaluated and displayed (operate function)
- Update handleOperator, check if operator has been assigned an operator
    - If so, operate, save result in result variable, displayValue = result
    - firstOperand = result so it can be used in further calculation
    - If operator and waitingForSecondOperand, operator = nextOperator, return
- Reset Calculator function, set all calculator values to original values
    - Replace event listener callback with reset function
- Fix decimal bug, amend input decimal function
    - if waitingForSecondOperand is true & decimal is entered, displayValue = 0,
    - waitingForSecondOperand = false
- Refactor button event listeners to one switch block
- Update handleOperator to handle FP imprecision with parseFloat & toFixed()

*/