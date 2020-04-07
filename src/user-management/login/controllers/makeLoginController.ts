import { HttpRequest } from "src/types/HttpRequest";
import { HttpResponse } from "src/types/HttpResponse";
import { LoginUseCase } from "../use-cases/makeLoginUseCase";
import { response } from "express";
type MakeLoginParams = {
  login: LoginUseCase;
};
export const makeLoginController = function makeLogin({
  login,
}: MakeLoginParams) {
  return async function loginController(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;
      if (body) {
        const response: HttpResponse = {};
        let headers = {};
        const { username, password } = body;
        if (!username) {
          console.log("Invalid username");
        }
        if (!password) {
          console.log("Invalid password");
        }
        if (username && password) {
          const valueOrError = await login({ username, password });
          if (valueOrError.isSuccess()) {
            const sid = valueOrError.value;
            headers = Object.assign(headers, { "Set-Cookie": `sid=${sid}` });
            response.statusCode = 200;
          } else {
            const error = valueOrError.value;
            response.statusCode = error.status || 401;
            response.body = error;
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
