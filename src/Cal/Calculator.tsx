import React, { useState } from 'react';

const Calculator = () => {

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);


  const handleClick = (value) => {
    setInput(input + value);
  };


  const handleEvaluate = () => {
    try {

      const evaluatedResult = eval(input);
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };


  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        {result !== null && <div className="result">= {result}</div>}
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>

        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>←</button>
        <button onClick={() => handleClick('/')}>/</button>

        <button onClick={handleEvaluate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
