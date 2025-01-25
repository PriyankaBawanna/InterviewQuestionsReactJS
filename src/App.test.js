<<<<<<< HEAD
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
=======
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Calculator from "./App";

describe("React Calculator Tests", () => {
  // Rendering and Layout Test
  test("renders calculator display and at least 16 buttons", () => {
    render(<App />);
    // Ensure the input field is rendered
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    // Ensure there are at least 16 buttons rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(16);
  });

  test("handles incomplete expression (e.g., pressing '=' without complete expression)", () => {
    render(<Calculator />);

    const inputField = screen.getByRole("textbox");
    const button7 = screen.getByText("7");
    const buttonPlus = screen.getByText("+");
    const equalsButton = screen.getByText("=");

    // Simulate user interaction
    fireEvent.click(button7);
    fireEvent.click(buttonPlus);
    fireEvent.click(equalsButton);

    // Expect "Error" to be displayed
    expect(inputField).toHaveValue("Error");
  });

  // Button Interactions Test
  test("updates display on button click", () => {
    render(<App />);

    // Click "7", then "+"
    fireEvent.click(screen.getByText("7"));
    fireEvent.click(screen.getByText("+"));

    // Check if the display updates to "7+"
    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("7+");
  });

  // Calculation Accuracy Tests
  test("correctly calculates 2 + 3", () => {
    render(<App />);

    // Simulate the calculation 2 + 3
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("5");
  });

  test("correctly calculates 5 - 2", () => {
    render(<App />);

    // Simulate the calculation 5 - 2
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("3");
  });

  test("correctly calculates 4 * 5", () => {
    render(<App />);

    // Simulate the calculation 4 * 5
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("*"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("20");
  });

  test("correctly calculates 8 / 2", () => {
    render(<App />);

    // Simulate the calculation 8 / 2
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("4");
  });

  // Edge Case Handling
  test("handles division by zero", () => {
    render(<App />);

    // Simulate the calculation 5 / 0
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("Infinity");
  });

  test("handles division zero by zero", () => {
    render(<App />);

    // Simulate the calculation 0 / 0
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("NaN");
  });

  test('handles incomplete expression (e.g., pressing "=" without complete expression)', () => {
    render(<App />);

    // Simulate incomplete expression: pressing "=" without a full input
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("Error");
  });

  // Clear Functionality
  test("clears input and result", () => {
    render(<App />);

    // Simulate a calculation, then press "C" to clear
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("C"));

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("");
  });
>>>>>>> d26244c1658b0b839f91a379585b7430a1590294
});
