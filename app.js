class Calculator {
  constructor(PreviousOperandTextElement, CurrentOperandTextElement) {
    this.PreviousOperandTextElement = PreviousOperandTextElement;
    this.CurrentOperandTextElement = CurrentOperandTextElement;
    this.clear();
  }

  clear() {
    this.PreviousOperand = "";
    this.CurrentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.CurrentOperand = this.CurrentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.CurrentOperand.includes(".")) return;
    this.CurrentOperand = this.CurrentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.CurrentOperand == "") return;
    if (this.CurrentOperand !== "") {
      this.evaluate();
    }
    this.operation = operation; 
    this.PreviousOperand = this.CurrentOperand + this.operation
    this.CurrentOperand = "";
  }

  evaluate() {
    let evaluated;
    const prev = parseFloat(this.PreviousOperand);
    const curr = parseFloat(this.CurrentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        evaluated = prev + curr;
        break;
      case "-":
        evaluated = prev - curr;
        break;
      case "*":
        evaluated = prev * curr;
        break;
      case "÷":
        evaluated = prev / curr;
        break;
      default:
        return;
    }
    this.CurrentOperand = evaluated;
    this.operation = undefined;
    this.PreviousOperand = "";
  }

  updateDisplay() {
    this.CurrentOperandTextElement.innerText = this.CurrentOperand;
    this.PreviousOperandTextElement.innerText = this.PreviousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equal]");
const PreviousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const CurrentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  PreviousOperandTextElement,
  CurrentOperandTextElement
);

numberButtons.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    calculator.appendNumber(buttons.innerText);
    calculator.updateDisplay();
  });
});
operationButton.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    calculator.chooseOperation(buttons.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", (buttons) => {
  calculator.evaluate();
  calculator.updateDisplay();
});
allclearButton.addEventListener("click", (buttons) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
