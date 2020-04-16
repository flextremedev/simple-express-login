import { HttpRequest } from "../../common/types/HttpRequest";
import { HttpResponse } from "../../common/types/HttpResponse";

export const makeLogoutController = function makeLogoutController() {
  return async function logoutController(
    req: HttpRequest
  ): Promise<HttpResponse> {
    const response: HttpResponse = {};
    try {
      if (req.session) {
        req.session.destroy(console.log);
      }
      response.statusCode = 200;
      return response;
    } catch (e) {
      response.statusCode = 500;
      return response;
    }
  };
};
