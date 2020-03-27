import { HttpRequest } from "src/types/HttpRequest";
import { HttpResponse } from "src/types/HttpResponse";
import { LoginUseCase } from "../use-cases/makeLoginUseCase";
type MakeLoginParams = {
  login: LoginUseCase;
};
export const makeLoginController = function makeLogin({
  login
}: MakeLoginParams) {
  return async function loginController(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;
      if (body) {
        let response: HttpResponse = {};
        let headers = {};
        const { username, password } = body;
        if (!username) {
          console.log("Invalid username");
        }
        if (!password) {
          console.log("Invalid password");
        }
        if (username && password) {
          const sid = await login({ username, password });
          if (sid) {
            headers = Object.assign(headers, { "Set-Cookie": `sid=${sid}` });
            response = Object.assign(response, { statusCode: 200 });
          } else {
            response = Object.assign(response, { statusCode: 401 });
          }
        } else {
          response = Object.assign(response, { statusCode: 401 });
        }
        response = Object.assign(response, { headers });
        return response;
      }
      throw Error("Username or password not set!");
    } catch (e) {
      throw new Error(e);
    }
  };
};