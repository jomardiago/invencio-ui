import { HttpResponse, http } from "msw";
import { LOGIN_RESPONSE } from "./dummyData/loginData";

export const handlers = [
  http.post("*/auth/login", () => {
    return HttpResponse.json(LOGIN_RESPONSE, {
      status: 201,
    });
  }),
];
