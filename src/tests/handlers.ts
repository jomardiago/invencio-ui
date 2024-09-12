import { HttpResponse, http } from "msw";
import { LOGIN_RESPONSE } from "./dummyData/loginData";
import { USERS_RESPONSE } from "./dummyData/usersData";

export const handlers = [
  http.post("*/auth/login", () => {
    return HttpResponse.json(LOGIN_RESPONSE, {
      status: 201,
    });
  }),

  http.get("*/users", () => {
    return HttpResponse.json(USERS_RESPONSE, {
      status: 200,
    });
  }),

  http.post("*/users", () => {
    return HttpResponse.json(
      { message: "User created." },
      {
        status: 201,
      },
    );
  }),

  http.patch("*/users/*/role", () => {
    return HttpResponse.json(
      { message: "Role updated." },
      {
        status: 201,
      },
    );
  }),
];
