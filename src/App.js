import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [touched, setTouched] = useState({ first: false, last: false });
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  // Regex pattern for valid names (letters, hyphens, apostrophes, and spaces)
  const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9-'#! ]+$/;

  // Derived disabled state for submit button
  const isDisabled = !firstName.trim() || !lastName.trim() || firstNameError || lastNameError;

  // Validation function for names
  const validateName = (value, setError) => {
    if (!value.trim()) {
      setError('This field is required');
    } else if (!NAME_REGEX.test(value)) {
      setError('Invalid characters detected');
    } else {
      setError('');
    }
  };

  const handleFirstName = (value) => {
    setFirstName(value);
    validateName(value, setFirstNameError);
  };

  const handleLastName = (value) => {
    setLastName(value);
    validateName(value, setLastNameError);
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return firstName.trim() && lastName.trim() && !firstNameError && !lastNameError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Force validation of both fields
    setTouched({ first: true, last: true });

    // Only submit if both fields are valid
    if (isFormValid()) {
      setFullName(`${firstName.trim()} ${lastName.trim()}`);
    } else {
      setFullName('');
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
            onChange={(e) => handleFirstName(e.target.value)}
            onBlur={() => setTouched(p => ({ ...p, first: true }))}
            data-testid="first-name-input"
            aria-invalid={!!firstNameError}
          />
          {touched.first && firstNameError && (
            <span className="error" data-testid="first-name-error">
              {firstNameError}
            </span>
          )}
        </label>
        
        <label htmlFor="last-name-input">
          Last Name
          <input
            id="last-name-input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleLastName(e.target.value)}
            onBlur={() => setTouched(p => ({ ...p, last: true }))}
            data-testid="last-name-input"
            aria-invalid={!!lastNameError}
          />
          {touched.last && lastNameError && (
            <span className="error" data-testid="last-name-error">
              {lastNameError}
            </span>
          )}
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
