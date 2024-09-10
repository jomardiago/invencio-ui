import { HttpResponse, http } from "msw";

export const handlers = [
  http.post("*/check-health", () => {
    return HttpResponse.json({
      message: "Healthy...",
    });
  }),
];
