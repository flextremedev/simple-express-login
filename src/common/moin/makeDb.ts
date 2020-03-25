import { UserEntity } from "../../auth/entities/User";

export type MakeDb = () => Promise<DBClient>;
const mockDb = {
  users: [{ username: "username", password: "password" }]
};
export type DBClient = {
  users: {
    findOne: (username: string) => Promise<UserEntity | undefined>;
  };
};
const mockDbClient: DBClient = {
  users: {
    findOne: (username): Promise<UserEntity | undefined> =>
      new Promise(res => {
        const user = mockDb.users.find(user => user.username === username);
        res(user);
      })
  }
};
export const makeDb: MakeDb = () => new Promise(res => res(mockDbClient));
