import { HttpRequest } from "src/common/types/HttpRequest";
import { HttpResponse } from "src/common/types/HttpResponse";
import { LoginUseCase } from "../use-cases/makeLoginUseCase";
import { response } from "express";
type MakeLoginParams = {
  login: LoginUseCase;
};
export const makeLoginController = function makeLogin({
  login,
}: MakeLoginParams) {
  return async function loginController(
    req: HttpRequest
  ): Promise<HttpResponse> {
    console.log(req.session);
    try {
      const { body } = req;
      if (body) {
        const response: HttpResponse = {};
        const headers = {};
        const { username, password } = body;
        if (!username) {
          console.log("Invalid username");
        }
        if (!password) {
          console.log("Invalid password");
        }
        if (username && password) {
          const maybeUser = await login({ username, password });
          if (maybeUser.isSuccess()) {
            const user = maybeUser.getValue();
            if (req.session) {
              req.session.userId = user.id;
            }
            response.statusCode = 200;
          } else {
            const error = maybeUser.getValue();
            response.statusCode = error.status || 401;
            response.body = error.toJS();
          }
        } else {
          response.statusCode = 401;
        }
        response.headers = headers;
        return response;
      } else {
        response.statusCode = 400;
        return response;
      }
    } catch (e) {
      response.statusCode = 500;
      return response;
    }
  };
};
