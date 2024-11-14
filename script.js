const largeDisplay = document.getElementById('largeDisplay');
const smallDisplay = document.getElementById('smallDisplay');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let visible = false;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    console.log(op);
    if (currentOperand === '') return;
    if (previousOperand !== '') compute();
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    smallDisplay.innerText = `${previousOperand} ${operation}`;
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
        default: return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    largeDisplay.innerText = currentOperand;
    if (operation != null) {
        smallDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        smallDisplay.innerText = '';
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'CE') {
            currentOperand = '';
            updateDisplay();
        } else if (value === 'C') {
            currentOperand = '';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
        } else if (value === '=') {
            compute();
            button.classList.add('equalsc');
            setTimeout(() => button.classList.remove('equalsc'), 100);
        } else if (value === 'x²') {
            currentOperand = currentOperand * currentOperand;
            largeDisplay.innerText = currentOperand;
        } else if (value === '±') {
            currentOperand = currentOperand * -1;
            largeDisplay.innerText = currentOperand;
        } else {
            chooseOperation(value);
        }
        if (value !== '=') {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        }
    });
});

const keyToButtonMap = {
    '0': '0', '1': '1', '2': '2', '3': '3',
    '4': '4', '5': '5', '6': '6', '7': '7',
    '8': '8', '9': '9', '.': '.',
    '+': '+', '-': '-', '*': '*', '/': '/',
    'Enter': '=', '=': '=',
    'Backspace': 'CE', 'Delete': 'C'
};

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const buttonValue = keyToButtonMap[key];
    if (buttonValue) {
        const button = Array.from(document.querySelectorAll('.button')).find(btn => btn.innerText === buttonValue);
        if (button) {
            button.click();
        }
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key == " "){
        Bezar();
    }
});

document.getElementById('small-calc').addEventListener('click', Bezar);
document.getElementById('close').addEventListener('click', Bezar);

function Bezar(){
    if (!visible) {
        document.getElementById("calculator").style.display = "block";
        visible = true;
    }else {
        document.getElementById("calculator").style.display = "none";
        visible = false;
    }
    };