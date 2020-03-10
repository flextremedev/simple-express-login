import { DBClient } from "./loginUseCase";

type MakeLoginUseCaseParams = {
  db: DBClient;
  uuid: () => string;
};
type LoginParams = {
  username: string;
  password: string;
};
export type LoginUseCase = (
  loginData: LoginParams
) => Promise<string | undefined>;
export const makeLoginUseCase = function makeLoginUseCase({
  db,
  uuid
}: MakeLoginUseCaseParams): LoginUseCase {
  return async function loginUseCase({
    username,
    password
  }): Promise<string | undefined> {
    try {
      const found = await db.users.find({ username, password });
      if (found) {
        // TODO: save session id for future authentication
        return uuid();
      }
      return;
    } catch (e) {
      console.log(e);
      throw Error("Login failed!");
    }
  };
};
