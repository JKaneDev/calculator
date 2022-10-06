const calculator = {
    displayValue: '0',
    runningCalc: null,
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
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case 'x':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            clearDisplay();
            break;
        case 'delete':
            deleteEntry();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateRunningCalc();
    updateDisplay();
}));

function updateRunningCalc() {
    const runningCalc = document.getElementById('running-calc');
    runningCalc.value = calculator.runningCalc;
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = calculator.displayValue;
}
updateDisplay(); 

function clearDisplay() {
    calculator.displayValue = '0';
    calculator.runningCalc = null;
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function deleteEntry() {
    const { displayValue } = calculator;
    calculator.displayValue = calculator.displayValue.slice(0, -1);
}

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
        calculator.runningCalc = `${firstOperand} ${operator} ${inputValue} ${nextOperator}`
        calculator.displayValue = `${parseFloat(result.toFixed(10))}`;
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
