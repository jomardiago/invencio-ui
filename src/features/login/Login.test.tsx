import { describe, expect, it } from "vitest";
import { render, screen } from "../../tests/test-utils";
import Login from "./Login";

describe("Login", () => {
  it("renders the login component correctly", () => {
    const {
      getLoginHeading,
      getEmailTextInput,
      getPasswordTextInput,
      getLoginButton,
    } = renderLogin();

    expect(getLoginHeading()).toBeInTheDocument();
    expect(getEmailTextInput()).toBeInTheDocument();
    expect(getPasswordTextInput()).toBeInTheDocument();
    expect(getLoginButton()).toBeInTheDocument();
  });
});

const renderLogin = () => {
  render(<Login />);

  const getLoginHeading = () => screen.getByRole("heading", { name: "Login" });
  const getEmailTextInput = () =>
    screen.getByRole("textbox", { name: "Email" });
  const getPasswordTextInput = () => screen.getByLabelText("Password");
  const getLoginButton = () => screen.getByRole("button", { name: "Login" });

  return {
    getLoginHeading,
    getEmailTextInput,
    getPasswordTextInput,
    getLoginButton,
  };
};
