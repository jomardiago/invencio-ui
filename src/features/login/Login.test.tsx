import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { render, screen, userEvent, waitFor } from "../../tests/test-utils";
import { server } from "../../tests/server";
import useSessionStore from "../../stores/sessionStore";
import { LOGIN_RESPONSE } from "../../tests/dummyData/loginData";
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

  it("shows the error messages when you submit an empty form", async () => {
    userEvent.setup();

    const { getLoginButton } = renderLogin();

    await userEvent.click(getLoginButton());

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be atleast 5 characters"),
    ).toBeInTheDocument();
  });

  it("shows the correct error message when login api throws an error", async () => {
    userEvent.setup();
    mockLoginErrorResponse("User does not exists.");

    const { getEmailTextInput, getPasswordTextInput, getLoginButton } =
      renderLogin();

    await userEvent.type(getEmailTextInput(), "invalid@email.com");
    await userEvent.type(getPasswordTextInput(), "password");
    await userEvent.click(getLoginButton());

    expect(
      await screen.findByText("User does not exists."),
    ).toBeInTheDocument();
  });

  it("sets the session if the login is successful", async () => {
    userEvent.setup();

    const { getEmailTextInput, getPasswordTextInput, getLoginButton } =
      renderLogin();

    await userEvent.type(getEmailTextInput(), "test@email.com");
    await userEvent.type(getPasswordTextInput(), "password");
    await userEvent.click(getLoginButton());

    await waitFor(() => {
      const session = useSessionStore.getState().session;
      expect(session).toStrictEqual(LOGIN_RESPONSE);
    });
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

const mockLoginErrorResponse = (message: string) => {
  server.use(
    http.post("*/auth/login", () => {
      return HttpResponse.json({ message }, { status: 404 });
    }),
  );
};
