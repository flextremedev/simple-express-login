import { UserEntity } from "../../user-management/entities/User";

export type MakeDb = () => Promise<DBClient>;
type Db = {
  users: { [key: string]: UserEntity };
};
const mockDb: Db = {
  users: {
    1: {
      id: "1",
      username: "te",
      password: "$2a$10$qmuM0r5v2lPwXnifZX/abugN2q5hz0YlmOqJLZF2.fasg2XbG8g/y",
    },
  },
};
export type DBClient = {
  users: {
    insertOne: (userEntity: UserEntity) => Promise<UserEntity | undefined>;
    findOne: (username: string) => Promise<UserEntity | undefined>;
  };
};
const mockDbClient: DBClient = {
  users: {
    insertOne: (userEntity: UserEntity): Promise<UserEntity | undefined> =>
      new Promise((res) => {
        const usernameExists = Object.keys(mockDb.users).some(
          (userId) => mockDb.users[userId].username === userEntity.username
        );
        if (!usernameExists) {
          mockDb.users = Object.assign(mockDb.users, {
            [userEntity.id]: userEntity,
          });
          console.log("Inserted", { userEntity, mockDb });
          res(userEntity);
        } else {
          console.log("Username already taken.");
          // TODO: Specific error for better handling
          res(undefined);
        }
      }),
    findOne: (username): Promise<UserEntity | undefined> =>
      new Promise((res) => {
        const user = Object.keys(mockDb.users).find(
          (userId) => mockDb.users[userId].username === username
        );
        if (user) {
          res(mockDb.users[user]);
        }
        res(undefined);
      }),
  },
};
export const makeDb: MakeDb = () => new Promise((res) => res(mockDbClient));
