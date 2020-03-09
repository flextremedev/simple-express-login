import { v4 as uuid } from "uuid";

const mockDb = {
  users: [{ username: "username", password: "password" }]
};
type DBClient = {
  users: {
    find: ({
      username,
      password
    }: {
      username: string;
      password: string;
    }) => Promise<boolean>;
  };
};
const mockDbClient: DBClient = {
  users: {
    find: ({ username, password }): Promise<boolean> =>
      new Promise(res => {
        const found = mockDb.users.some(
          user => user.username === username && user.password === password
        );
        res(found);
      })
  }
};
// TODO: replace with real implementation
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

export const login = makeLoginUseCase({ db: mockDbClient, uuid });
