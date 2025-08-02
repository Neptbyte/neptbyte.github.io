class Calculator {
    constructor(historyTextElement, currentOperandTextElement) {
        this.historyTextElement = historyTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.history = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.history === '') return;
        if (this.history !== '') {
            this.compute();
        }
        this.operation = operation;
        this.history = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.history);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.history = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.historyTextElement.innerText = `${this.history} ${this.operation}`;
        } else {
            this.historyTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const functionButtons = document.querySelectorAll('[data-function]');
const equalsButton = document.querySelector('[data-equals]');
const historyTextElement = document.querySelector('.history');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(historyTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.innerText;
        if (func === 'C') {
            calculator.clear();
        } else if (func === 'DEL') {
            calculator.delete();
        }
        // Add more complex function logic here, e.g., sin, cos, etc.
        // For simplicity, this example only handles clear and delete.
        calculator.updateDisplay();
    });
});

