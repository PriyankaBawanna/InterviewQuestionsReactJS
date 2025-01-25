import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  const isDisabled = !firstName.trim() || !lastName.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      setFullName(`${firstName} ${lastName}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="name-form">
        <label htmlFor="first-name-input">
          First Name
          <input
            id="first-name-input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            data-testid="first-name-input"
          />
        </label>
        
        <label htmlFor="last-name-input">
          Last Name
          <input
            id="last-name-input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            data-testid="last-name-input"
          />
        </label>
        
        <button 
          type="submit" 
          data-testid="submit-button"
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
      {fullName && (
        <div data-testid="full-name-display">
          Full Name: {fullName}
        </div>
      )}
    </div>
  );
};

export default App;
