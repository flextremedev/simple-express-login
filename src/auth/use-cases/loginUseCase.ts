import { v4 as uuid } from "uuid";
import { makeLoginUseCase } from "./makeLoginUseCase";

const mockDb = {
  users: [{ username: "username", password: "password" }]
};
export type DBClient = {
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

export const login = makeLoginUseCase({ db: mockDbClient, uuid });
