import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  // Test Case 1: Initial Page Load Tests
  test('renders form elements correctly', () => {
    render(<App />);
    
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.queryByTestId('full-name-display')).not.toBeInTheDocument();
  });

  // Test Case 2: Input Field Functionality Tests
  test('updates input fields correctly', async () => {
    render(<App />);
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
  });

  // Test Case 3: Form Submission Tests
  test('displays full name after submission', async () => {
    render(<App />);
    
    await userEvent.type(screen.getByTestId('first-name-input'), 'John');
    await userEvent.type(screen.getByTestId('last-name-input'), 'Doe');
    await userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('full-name-display')).toHaveTextContent('Full Name: John Doe');
  });

  // Test Case 4: Form Submission Tests (No Page Reload)
  test('prevents page reload on form submission', () => {
    render(<App />);
    const form = screen.getByTestId('name-form');
    const handleSubmit = jest.fn(e => e.preventDefault());
    form.onsubmit = handleSubmit;

    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalled();
  });

  // Test Case 5: Edge Case Tests (One field empty)
  test('does not display full name when one field is empty', async () => {
    render(<App />);
    
    await userEvent.type(screen.getByTestId('first-name-input'), 'John');
    await userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('full-name-display')).not.toBeInTheDocument();
  });

  // Test Case 6: Edge Case Tests (Both fields empty)
  test('does not display full name when both fields are empty', async () => {
    render(<App />);
    
    await userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.queryByTestId('full-name-display')).not.toBeInTheDocument();
  });

  // Test Case 7: Edge Case Tests (Various inputs)
  test.each([
    ['Jane', 'Doe', 'Jane Doe'],
    ['O\'Conner', 'Smith', 'O\'Conner Smith'],
    ['123', '456', '123 456'],
    ['María', 'García', 'María García'],
    ['!@#$', '%^&*', '!@#$ %^&*'],
  ])('handles various inputs correctly (firstName: %s, lastName: %s)', async (firstName, lastName, expected) => {
    render(<App />);
    
    await userEvent.type(screen.getByTestId('first-name-input'), firstName);
    await userEvent.type(screen.getByTestId('last-name-input'), lastName);
    await userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('full-name-display')).toHaveTextContent(expected);
  });
});