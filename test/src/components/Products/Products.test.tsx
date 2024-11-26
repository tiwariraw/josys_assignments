/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent } from "@testing-library/react";
import Products from "./Products";

describe("Product Component", () => {
  test("renders Products component without crashing", () => {
    const { container } = render(<Products />);
    let inputElements = container.querySelectorAll("input");
    expect(inputElements.length).toBe(3);
  });

  test("form field render", () => {
    render(<Products />);
    expect(screen.getByPlaceholderText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Quantity/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /TotalAmntBtn/i })
    ).toBeInTheDocument();
  });

  test("total amount calculation and display", async () => {
    render(<Products />);

    const productName = screen.getByPlaceholderText(/Product Name/i);
    const price = screen.getByPlaceholderText(/Price/i);
    const quantity = screen.getByPlaceholderText(/Quantity/i);
    const totalAmntLink = screen.getByRole("link", {
      name: /TotalAmntBtn/i,
    });

    fireEvent.change(productName, { target: { value: "phone" } });
    fireEvent.change(price, { target: { value: "10000" } });
    fireEvent.change(quantity, { target: { value: "3" } });

    fireEvent.click(totalAmntLink);

    // line 33 will execute only when the element with this data-testid is available in the dom
    const totalAmount = await screen.findByTestId("totalamnt");
    expect(totalAmount).toBeInTheDocument();
  });

  test("no total amount calculation if inputs are empty", () => {
    render(<Products />);

    const totalAmntLink = screen.getByRole("link", {
      name: /TotalAmntBtn/i,
    });

    fireEvent.click(totalAmntLink);

    expect(screen.queryByText(/Total Amount:/i)).not.toBeInTheDocument();
  });
});
