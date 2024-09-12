import { describe, expect, it } from "vitest";
import { render, screen, userEvent, waitFor } from "../../tests/test-utils";
import Users from "./Users";
import { USERS_RESPONSE } from "../../tests/dummyData/usersData";
import { server } from "../../tests/server";
import { http, HttpResponse } from "msw";

describe("Users", () => {
  it("should render the page correctly", async () => {
    const { getPageHeader, getPageSubHeader, getEmailColumn } = renderUsers();

    await waitFor(() => {
      expect(getPageHeader()).toBeInTheDocument();
    });

    expect(getPageSubHeader()).toBeInTheDocument();
    expect(getEmailColumn()).toBeInTheDocument();
  });

  it("should render the create user form when add new user button is clicked", async () => {
    userEvent.setup();

    const {
      getAddNewUserButton,
      getFormHeader,
      getEmailTextInput,
      getPasswordTextInput,
      getSaveButton,
    } = renderUsers();

    await waitFor(() => {
      expect(getAddNewUserButton()).toBeInTheDocument();
    });

    await userEvent.click(getAddNewUserButton());

    expect(getFormHeader()).toBeInTheDocument();
    expect(getEmailTextInput()).toBeInTheDocument();
    expect(getPasswordTextInput()).toBeInTheDocument();
    expect(getSaveButton()).toBeInTheDocument();
  });

  it("should render the correct error messages when an empty form is submitted.", async () => {
    userEvent.setup();

    const { getAddNewUserButton, getSaveButton } = renderUsers();

    await waitFor(() => {
      expect(getAddNewUserButton()).toBeInTheDocument();
    });

    await userEvent.click(getAddNewUserButton());

    await userEvent.click(getSaveButton());

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be atleast 5 characters"),
    ).toBeInTheDocument();
  });

  it("should display the correct error message if the create user mutation returns an error", async () => {
    const errorMessage = "Users already exists.";
    userEvent.setup();
    mockErrorResponse(errorMessage);

    const {
      getAddNewUserButton,
      getEmailTextInput,
      getPasswordTextInput,
      getSaveButton,
    } = renderUsers();

    await waitFor(() => {
      expect(getAddNewUserButton()).toBeInTheDocument();
    });

    await userEvent.click(getAddNewUserButton());

    await userEvent.type(getEmailTextInput(), "test@email.com");
    await userEvent.type(getPasswordTextInput(), "password");
    await userEvent.click(getSaveButton());

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should display the correct success message if user mutation is successful", async () => {
    userEvent.setup();

    const {
      getAddNewUserButton,
      getEmailTextInput,
      getPasswordTextInput,
      getSaveButton,
    } = renderUsers();

    await waitFor(() => {
      expect(getAddNewUserButton()).toBeInTheDocument();
    });

    await userEvent.click(getAddNewUserButton());

    await userEvent.type(getEmailTextInput(), "test@email.com");
    await userEvent.type(getPasswordTextInput(), "password");
    await userEvent.click(getSaveButton());

    await waitFor(() => {
      expect(screen.getByText("User created.")).toBeInTheDocument();
    });
  });

  it("should display the correct error message if update role mutation is successful", async () => {
    userEvent.setup();

    const { getPageHeader, getAdminToggle } = renderUsers();

    await waitFor(() => {
      expect(getPageHeader()).toBeInTheDocument();
    });

    await userEvent.click(getAdminToggle());

    await waitFor(() => {
      expect(screen.getByText("Role updated.")).toBeInTheDocument();
    });
  });

  it.only("should display the delete confirmation dialog and show the correct message if delete is sucessful", async () => {
    userEvent.setup();

    const {
      getPageHeader,
      getDeleteUserRowButton,
      getDelConfirmCancelButton,
      getDelConfirmDeleteButton,
    } = renderUsers();

    await waitFor(() => {
      expect(getPageHeader()).toBeInTheDocument();
    });

    await userEvent.click(getDeleteUserRowButton());

    expect(getDelConfirmCancelButton()).toBeInTheDocument();
    expect(getDelConfirmDeleteButton()).toBeInTheDocument();

    await userEvent.click(getDelConfirmDeleteButton());

    await waitFor(() => {
      expect(screen.getByText("User deleted.")).toBeInTheDocument();
    });
  });
});

const renderUsers = () => {
  render(<Users />);

  const getPageHeader = () => screen.getByText("Users Management");
  const getPageSubHeader = () =>
    screen.getByText("Manage all the users in your organization.");
  const getEmailColumn = () =>
    screen.getByRole("cell", { name: USERS_RESPONSE[0].email });
  const getAddNewUserButton = () =>
    screen.getByRole("button", { name: "Add New User" });
  const getFormHeader = () =>
    screen.getByRole("heading", { name: /create user/i });
  const getEmailTextInput = () =>
    screen.getByRole("textbox", { name: /email/i });
  const getPasswordTextInput = () => screen.getByLabelText(/password/i);
  const getSaveButton = () => screen.getByRole("button", { name: /save/i });
  const getAdminToggle = () =>
    screen.getByText(/yes/i) || screen.getByText(/no/i);
  const getDeleteUserRowButton = () =>
    screen.getByRole("button", { name: "Delete User" });
  const getDelConfirmCancelButton = () =>
    screen.getByRole("button", {
      name: /cancel/i,
    });
  const getDelConfirmDeleteButton = () =>
    screen.getByRole("button", { name: /danger delete/i });

  return {
    getPageHeader,
    getPageSubHeader,
    getEmailColumn,
    getAddNewUserButton,
    getFormHeader,
    getEmailTextInput,
    getPasswordTextInput,
    getSaveButton,
    getAdminToggle,
    getDeleteUserRowButton,
    getDelConfirmCancelButton,
    getDelConfirmDeleteButton,
  };
};

const mockErrorResponse = (message: string) => {
  server.use(
    http.post("*/users", () => {
      return HttpResponse.json({ message }, { status: 500 });
    }),
  );
};
