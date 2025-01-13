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
    try {
      let result = eval(input);

      // Handle edge cases
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
      {/* Input field to display the current expression */}
      <input type="text" value={input} readOnly className="input" />
      <div className="calculator-grid">
        <div className="numbers">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("0")}>0</button>
        </div>
        <div className="operators">
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={handleClear}>C</button>
          <button onClick={handleEvaluate}>=</button>
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
