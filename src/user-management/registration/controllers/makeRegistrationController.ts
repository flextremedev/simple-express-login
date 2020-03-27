import { RegistrationUseCase } from "../use-cases/makeRegistrationUseCase";
import { HttpRequest } from "../../../types/HttpRequest";
import { HttpResponse } from "../../../types/HttpResponse";

type MakeRegistrationControllerParams = {
  registrationUseCase: RegistrationUseCase;
};
export const makeRegistrationController = ({
  registrationUseCase
}: MakeRegistrationControllerParams) => {
  return async function registrationController(
    req: HttpRequest
  ): Promise<HttpResponse> {
    try {
      const { body } = req;
      if (body) {
        let response: HttpResponse = {};
        let headers = {};
        const { username, password } = body;
        if (!username) {
          console.log("Username not set.");
        }
        if (!password) {
          console.log("Password not set.");
        }
        if (username && password) {
          const sid = await registrationUseCase({ username, password });
          if (sid) {
            headers = Object.assign(headers, { "Set-Cookie": `sid=${sid}` });
            response = Object.assign(response, { statusCode: 201 });
          } else {
            response = Object.assign(response, { statusCode: 500 });
          }
        } else {
          response = Object.assign(response, { statusCode: 400 });
        }
        response = Object.assign(response, { headers });
        return response;
      }
      throw Error("Bad request.");
    } catch (e) {
      throw new Error(e);
    }
  };
};
