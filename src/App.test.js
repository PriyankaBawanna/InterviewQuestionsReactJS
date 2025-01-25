import { render, fireEvent, screen } from '@testing-library/react';
import App from "./App"
test('Initial Page Load Tests', () => {
  render(<App />);
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  expect(screen.queryByText(/Full Name:/)).toBeNull();
});

test('Input Field Functionality Tests', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  expect(screen.getByLabelText(/First Name/i).value).toBe('John');
  expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
});

test('Form Submission Tests - Displays Full Name', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.getByText(/Full Name: John Doe/i)).toBeInTheDocument();
});

test('Form Submission Tests - Does Not Reload Page', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(window.location.reload).not.toHaveBeenCalled();
});

test('Edge Case Tests - Submits Form with One Field Empty', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.queryByText(/Full Name:/)).toBeNull();
});

test('Edge Case Tests - Submits Form with Both Fields Empty', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.queryByText(/Full Name:/)).toBeNull();
});

test('Edge Case Tests - Special Characters and Numbers', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John123!' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe#@45' } });
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.getByText(/Full Name: John123! Doe#@45/i)).toBeInTheDocument();
});
