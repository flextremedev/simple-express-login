import { HttpRequest } from "src/common/types/HttpRequest";
import { HttpResponse } from "src/common/types/HttpResponse";
import { LoginUseCase } from "../use-cases/makeLoginUseCase";
import { response } from "express";
import { LoginError } from "../errors/LoginError";
type MakeLoginParams = {
  login: LoginUseCase;
};
export const makeLoginController = function makeLogin({
  login
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
              const { originalMaxAge } = req.session?.cookie;
              if (originalMaxAge) {
                response.body = { expiresIn: originalMaxAge, id: user.id };
              }
            }
            response.statusCode = 200;
          } else {
            const error = maybeUser.getValue();
            response.statusCode = error.status;
            response.body = error.toJS();
          }
        } else {
          const err = LoginError.create();
          response.statusCode = err.status;
          response.body = err.toJS();
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
