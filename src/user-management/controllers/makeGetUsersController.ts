import { GetUsersUseCase } from "../use-cases/makeGetUsersUseCase";
import { HttpResponse } from "../../common/types/HttpResponse";

type MakeGetUsersControllerParams = {
  getUsersUseCase: GetUsersUseCase;
};
export const makeGetUsersController = function makeGetUsersController({
  getUsersUseCase,
}: MakeGetUsersControllerParams) {
  return async function getUsersController(): Promise<HttpResponse> {
    const response: HttpResponse = {};
    try {
      const headers = {};
      const maybeUsers = await getUsersUseCase();
      if (maybeUsers.isSuccess()) {
        const users = maybeUsers.getValue();
        response.body = users;
        response.statusCode = 200;
      }
      response.headers = headers;
      return response;
    } catch (e) {
      response.statusCode = 500;
      return response;
    }
  };
};
