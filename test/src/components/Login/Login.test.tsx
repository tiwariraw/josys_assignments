/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
  // 1. renders render component without crashing
  test("renders render component without crashing", () => {
    const { container } = render(<Login />);
    let inputElements = container.querySelectorAll("input");
    expect(inputElements.length).toBe(3);

    // expect(screen.getByText('User Login')).toBeInTheDocument();
  });

  // 2. Testing input elements --- get data from textbox
  test("should user id textbox value is empty", () => {
    const { container } = render(<Login />);
    let textElement = container.querySelector<HTMLInputElement>("#t1");
    expect(textElement?.value).toBe("");
  });

  // 3. Testing input elements --- set data to textbox
  test("should set the correct value to textbox", () => {
    const { container } = render(<Login />);
    let textElement = container.querySelector<HTMLInputElement>("#t1");
    fireEvent.change(textElement!, { target: { value: "Narasimha" } });
    expect(textElement?.value).toBe("Narasimha");
  });

  // 4.  Testing Login button click event
  test("should display valid result message for correct credentails", () => {
    const { container } = render(<Login />);

    let uidElement: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#t1");
    let pwdElement: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#t2");
    let loginButton: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#b1");

    fireEvent.change(uidElement!, { target: { value: "admin" } });
    fireEvent.change(pwdElement!, { target: { value: "admin123" } });
    fireEvent.click(loginButton!);

    expect(screen.getByText("Welcome to Admin")).toBeInTheDocument();
  });

  // 5.  Testing Login button click event
  test("should display invalid message for wrong credentails", () => {
    const { container } = render(<Login />);

    let uidElement: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#t1");
    let pwdElement: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#t2");
    let loginButton: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#b1");
    let paraElement: HTMLInputElement | null =
      container.querySelector<HTMLInputElement>("#result");

    fireEvent.change(uidElement!, { target: { value: "hello" } });
    fireEvent.change(pwdElement!, { target: { value: "admin123" } });
    fireEvent.click(loginButton!);

    expect(paraElement!.textContent).toBe("Invalid User Id or Password");
  });

  // 6. error message when user id is not given
  test("error message when user id is not given", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByTestId("uid-error").textContent).toBe("missing user id");
  });

  // 7. error message when password is not given
  test("error message when password is not given", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByTestId("pwd-error").textContent).toBe(
      "missing password"
    );
  });

  // 8. correct credentials result
  test("correct credentials result", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("User Id"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Welcome to Admin")).toBeInTheDocument();
  });

  // 9. incorrect credentials result
  test("incorrect credentials result", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("User Id"), {
      target: { value: "ashish" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "ashish123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Invalid User Id or Password")).toBeInTheDocument();
  });

  // 10. if "SignUp" link exists
  test("if SignUp link exists", () => {
    render(<Login />);
    expect(screen.getByRole("link", { name: "SignUp" })).toBeInTheDocument();
  });
});
