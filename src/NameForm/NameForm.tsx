import React, { useState } from 'react';

const NameForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      setFullName(`${firstName} ${lastName}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="name-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          data-testid="first-name-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          data-testid="last-name-input"
        />
        <button type="submit" data-testid="submit-button">
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

export default NameForm;