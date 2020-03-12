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
    }) => Promise<LoginDTO>;
  };
};
type LoginDTO = {
  username: string;
  password: string;
};
const mockDbClient: DBClient = {
  users: {
    find: ({ username }): Promise<LoginDTO> =>
      new Promise(res => {
        const user = mockDb.users.find(user => user.username === username);
        res(user);
      })
  }
};

export const login = makeLoginUseCase({ db: mockDbClient, uuid });
