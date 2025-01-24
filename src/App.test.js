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
});
