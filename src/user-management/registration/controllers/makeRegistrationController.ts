import { RegistrationUseCase } from "../use-cases/makeRegistrationUseCase";
import { HttpRequest } from "../../../common/types/HttpRequest";
import { HttpResponse } from "../../../common/types/HttpResponse";
import { response } from "express";
import { RegistrationError } from "../errors/RegistrationError";
import { getExpirationByDuration } from "../../../common/utils/getExpirationByDuration";

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
        const response: HttpResponse = {};
        const headers = {};
        const { username, password } = body;
        if (!username) {
          console.log("Username not set.");
        }
        if (!password) {
          console.log("Password not set.");
        }
        if (username && password) {
          const maybeUser = await registrationUseCase({ username, password });
          if (maybeUser.isSuccess()) {
            const user = maybeUser.getValue();
            if (req.session) {
              req.session.userId = user.id;
              const { originalMaxAge } = req.session?.cookie;
              if (originalMaxAge) {
                const expires = getExpirationByDuration(originalMaxAge);
                response.body = { expires, id: user.id };
              }
            }
            response.statusCode = 201;
          } else {
            const error = maybeUser.getValue();
            response.statusCode = error.status;
            response.body = error.toJS();
          }
        } else {
          const err = RegistrationError.create();
          response.statusCode = err.status;
          response.body = err.toJS();
        }
        response.headers = headers;
        return response;
      }
      response.statusCode = 400;
      return response;
    } catch (e) {
      throw new Error(e);
    }
  };
};
