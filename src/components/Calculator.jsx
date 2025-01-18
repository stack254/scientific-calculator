import React, { useState, useEffect } from "react";
import Button from "./Button";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key >= "0" && event.key <= "9") {
      inputDigit(parseInt(event.key));
    } else if (event.key === ".") {
      inputDecimal();
    } else if (
      event.key === "+" ||
      event.key === "-" ||
      event.key === "*" ||
      event.key === "/"
    ) {
      performOperation(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
      performOperation("=");
    } else if (event.key === "Escape") {
      clear();
    }
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
      addToHistory(`${firstOperand} ${operator} ${inputValue} = ${result}`);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      case "sqrt":
        return Math.sqrt(secondOperand);
      case "pow":
        return Math.pow(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
  };

  const addToHistory = (calculation) => {
    setHistory([calculation, ...history.slice(0, 4)]);
  };

  const performAdvancedOperation = (operation) => {
    const inputValue = parseFloat(display);
    let result;

    switch (operation) {
      case "sqrt":
        result = Math.sqrt(inputValue);
        break;
      case "pow":
        setFirstOperand(inputValue);
        setOperator("pow");
        setWaitingForSecondOperand(true);
        return;
      default:
        return;
    }

    setDisplay(String(result));
    addToHistory(`${operation}(${inputValue}) = ${result}`);
  };

  return (
    <div className="calculator">
      <div className="calculator-history">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="calculator-display">{display}</div>
      <div className="calculator-keypad">
        <Button
          label="C"
          onClick={clear}
          className="calculator-button key-clear"
        />
        <Button
          label="√"
          onClick={() => performAdvancedOperation("sqrt")}
          className="calculator-button key-sqrt"
        />
        <Button
          label="x^y"
          onClick={() => performAdvancedOperation("pow")}
          className="calculator-button key-pow"
        />
        <Button
          label="/"
          onClick={() => performOperation("/")}
          className="calculator-button key-divide operator-keys"
        />

        <Button
          label="7"
          onClick={() => inputDigit(7)}
          className="calculator-button key-7"
        />
        <Button
          label="8"
          onClick={() => inputDigit(8)}
          className="calculator-button key-8"
        />
        <Button
          label="9"
          onClick={() => inputDigit(9)}
          className="calculator-button key-9"
        />
        <Button
          label="*"
          onClick={() => performOperation("*")}
          className="calculator-button key-multiply operator-keys"
        />

        <Button
          label="4"
          onClick={() => inputDigit(4)}
          className="calculator-button key-4"
        />
        <Button
          label="5"
          onClick={() => inputDigit(5)}
          className="calculator-button key-5"
        />
        <Button
          label="6"
          onClick={() => inputDigit(6)}
          className="calculator-button key-6"
        />
        <Button
          label="-"
          onClick={() => performOperation("-")}
          className="calculator-button key-subtract operator-keys"
        />

        <Button
          label="1"
          onClick={() => inputDigit(1)}
          className="calculator-button key-1"
        />
        <Button
          label="2"
          onClick={() => inputDigit(2)}
          className="calculator-button key-2"
        />
        <Button
          label="3"
          onClick={() => inputDigit(3)}
          className="calculator-button key-3"
        />
        <Button
          label="+"
          onClick={() => performOperation("+")}
          className="calculator-button key-add operator-keys"
        />

        <Button
          label="0"
          onClick={() => inputDigit(0)}
          className="calculator-button key-0"
        />
        <Button
          label="."
          onClick={inputDecimal}
          className="calculator-button key-decimal"
        />
        <Button
          label="="
          onClick={() => performOperation("=")}
          className="calculator-button key-equals"
        />
      </div>
    </div>
  );
};

export default Calculator;
