import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [input, setInput] = useState("");

  // Handle button clicks for numbers and operators
  const handleClick = (value) => {
    setInput(input + value);
  };

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
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
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

const App = () => {
  return (
    <>
      {" "}
      Calculator
      <Calculator />
    </>
  );
};
export default App;
