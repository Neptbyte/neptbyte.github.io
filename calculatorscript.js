const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
let expression = '';
let lastAns = 0;

function updateDisplay(val) {
  display.textContent = val;
}

function appendValue(val) {
  if (expression === '0' && val !== '.') {
    expression = '';
  }
  expression += val;
  updateDisplay(expression);
}

// Mapping for functions with parentheses
const funcMap = {
  'sin(': 'Math.sin(',
  'cos(': 'Math.cos(',
  'tan(': 'Math.tan(',
  'log(': 'Math.log10(',
  'ln(': 'Math.log(',
  '√(': 'Math.sqrt(',
  'abs(': 'Math.abs(',
  'exp(': 'Math.exp(',
};

function replaceConstants(expr) {
  return expr
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/Ans/g, lastAns)
    .replace(/÷/g, '/')
    .replace(/×/g, '*');
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Evaluate expression (with function mapping and factorial)
function evaluate(expr) {
  let exp = expr;
  // Replace functions
  Object.keys(funcMap).forEach(f => {
    exp = exp.replaceAll(f, funcMap[f]);
  });
  // Replace power operator (^) with Math.pow
  exp = exp.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, 'Math.pow($1,$3)');
  // Replace constants
  exp = replaceConstants(exp);

  // Factorial handling: number! or expression!
  exp = exp.replace(/([0-9.]+|\([^)]+\))!/g, (match, num) => {
    try {
      let value = eval(num);
      return factorial(value);
    } catch {
      return 'NaN';
    }
  });

  // Allow commas (for functions like pow(a,b))
  exp = exp.replace(/,/g, ',');

  try {
    // eslint-disable-next-line no-eval
    let result = eval(exp);
    if (typeof result === 'number' && !isNaN(result)) {
      lastAns = result;
      return result;
    }
    return 'Error';
  } catch {
    return 'Error';
  }
}

buttons.addEventListener('click', e => {
  if (!e.target.classList.contains('btn')) return;
  const btn = e.target;

  // Number buttons
  if (btn.hasAttribute('data-num')) {
    appendValue(btn.getAttribute('data-num'));
    return;
  }

  // Operator buttons
  if (btn.hasAttribute('data-op')) {
    appendValue(btn.getAttribute('data-op'));
    return;
  }

  // Function buttons
  if (btn.classList.contains('function')) {
    appendValue(btn.getAttribute('data-func'));
    return;
  }

  // Clear button
  if (btn.id === 'clear') {
    expression = '';
    updateDisplay('0');
    return;
  }

  // Backspace button
  if (btn.id === 'backspace') {
    expression = expression.slice(0, -1);
    updateDisplay(expression || '0');
    return;
  }

  // Ans button
  if (btn.id === 'ans') {
    appendValue('Ans');
    return;
  }

  // Equals button
  if (btn.id === 'equals') {
    if (!expression) return;
    const result = evaluate(expression);
    updateDisplay(result);
    expression = '';
    return;
  }
});

updateDisplay('0');
