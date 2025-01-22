import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [input, setInput] = useState("");

  // Handle button clicks for numbers and operators
  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Handle clear button
  const handleClear = () => {
    setInput("");
  };

  // Handle evaluation of the expression
  const handleEvaluate = () => {
    // Check if the input is empty or ends with an operator
    if (input.trim() === "" || /[+\-*/]$/.test(input)) {
      setInput("Error");
      return;
    }

    try {
      let result = eval(input);

      if (result === Infinity) {
        setInput("Infinity");
      } else if (isNaN(result)) {
        setInput("NaN");
      } else {
        setInput(result.toString());
      }
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly className="input" />
      <div className="calculator-grid">
        <div className="numbers">
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((num) => (
            <button key={num} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))}
        </div>
        <div className="operators">
          {["+", "-", "*", "/", "C", "="].map((op) => (
            <button
              key={op}
              onClick={
                op === "="
                  ? handleEvaluate
                  : op === "C"
                  ? handleClear
                  : () => handleClick(op)
              }
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Calculator />
    </div>
  );
}

export default App;
