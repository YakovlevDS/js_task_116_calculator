const mathLine = document.getElementById('panel-math-line');
const result = document.getElementById('panel-result');
const buttons = document.getElementById('calculator-buttons');

let firstNumber = '';
let secondNumber = '';
let operator = '';

const resetVars = function () {
  firstNumber = '';
  secondNumber = '';
  operator = '';
}

buttons.addEventListener('click', function (e) {
  const button = e.target;
  const buttonValue = button.textContent;


  switch (buttonValue) {
    case 'C':
      mathLine.textContent = '';
      result.textContent = '0';
      resetVars();
      break;

    case '%':
      result.textContent = +(firstNumber / 100).toFixed(10);
      resetVars();
      break;

    case '=':
      if (secondNumber.length === 0) {
        return;
      }

      firstNumber = +firstNumber;
      secondNumber = +secondNumber;

      switch (operator) {
        case '/': result.textContent = +(firstNumber / secondNumber).toFixed(10);
          break;
        case '*': result.textContent = firstNumber * secondNumber;
          break;
        case '-': result.textContent = firstNumber - secondNumber;
          break;
        case '+': result.textContent = firstNumber + secondNumber;
          break;
      }

      resetVars();
      firstNumber = result.textContent;
      break;

    case '.':
      let number = (operator.length > 0) ? secondNumber : firstNumber;

      if (number.length === 0 || number.includes('.')) {
        return;
      }

      if (operator.length > 0) {
        secondNumber = secondNumber + buttonValue;
      } else {
        firstNumber = firstNumber + buttonValue;
      }
      break;
  }

  if (button.classList.contains('number')) {
    if (operator.length > 0) {
      secondNumber = secondNumber + buttonValue;
    } else {
      firstNumber = firstNumber + buttonValue;
    }
  } else if (button.classList.contains('operator')) {
    if (firstNumber.length === 0 || secondNumber.length !== 0) {
      return;
    }
    operator = buttonValue;
  }

  mathLine.textContent = `${firstNumber}${operator}${secondNumber}`;
});