import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component Tests', () => {
  test("renders initial elements correctly", () => {
    // Render the component
    render(<App />);

    // Check if the first name input exists
    const firstNameInput = screen.getByTestId("first-name-input");
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveValue("");

    // Check if the last name input exists
    const lastNameInput = screen.getByTestId("last-name-input");
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveValue("");

    // Check if the submit button exists and is disabled
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Verify that the full name display is not rendered
    expect(screen.queryByTestId("full-name-display")).not.toBeInTheDocument();
  });

  // Test Case 2: Input Field Functionality
  test('handles input field interactions correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const submitButton = screen.getByTestId('submit-button');

    // Test first name input
    await user.type(firstNameInput, 'John');
    expect(firstNameInput).toHaveValue('John');
    expect(submitButton).toBeDisabled();

    // Test last name input
    await user.type(lastNameInput, 'Doe');
    expect(lastNameInput).toHaveValue('Doe');
    expect(submitButton).not.toBeDisabled();

    // Test input clearing
    await user.clear(firstNameInput);
    expect(submitButton).toBeDisabled();
  });

  // Test Case 3: Form Submission
  test('submits form and displays full name', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.click(screen.getByTestId('submit-button'));

    const fullNameDisplay = screen.getByTestId('full-name-display');
    expect(fullNameDisplay).toBeInTheDocument();
    expect(fullNameDisplay).toHaveTextContent('John Doe');
  });

  // Test Case 4: Prevent Page Reload
  test('does not reload page on form submission', () => {
    const mockPreventDefault = jest.fn();
    render(<App />);
    
    const form = screen.getByTestId('name-form');
    const submitEvent = new Event('submit', { bubbles: true });
    submitEvent.preventDefault = mockPreventDefault;
    
    fireEvent(form, submitEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  // Test Case 5: One Field Empty
  test('handles submission with one empty field', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.click(screen.getByTestId('submit-button'));
    
    expect(screen.queryByTestId('full-name-display')).not.toBeInTheDocument();
  });

  // Test Case 6: Both Fields Empty
  test('handles submission with both fields empty', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByTestId('submit-button'));
    expect(screen.queryByTestId('full-name-display')).not.toBeInTheDocument();
  });

  // Test Case 7: Special Characters and Numbers
  test('handles special characters and numbers in name inputs', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John123!');
    await user.type(screen.getByTestId('last-name-input'), 'Doe#456');
    await user.click(screen.getByTestId('submit-button'));
    
    const fullNameDisplay = screen.getByTestId('full-name-display');
    expect(fullNameDisplay).toBeInTheDocument();
    expect(fullNameDisplay).toHaveTextContent('John123! Doe#456');
  })
});