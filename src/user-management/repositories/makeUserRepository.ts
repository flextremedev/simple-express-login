import { MakeDb } from "../../common/db/makeDb";
import type { UserEntity } from "../entities/User";
export type UserRepository = Readonly<{
  createUser: (userEntity: UserEntity) => Promise<UserEntity | undefined>;
  getByUsername: (username: string) => Promise<UserEntity | undefined>;
}>;
export const makeUserRepository = (makeDb: MakeDb): UserRepository => {
  const getByUsername = async function getByUsername(
    username: string
  ): Promise<UserEntity | undefined> {
    const db = await makeDb();
    const user = db.users.findOne(username);
    return user;
  };
  const createUser = async function createUser(userEntity: UserEntity): Promise<UserEntity |undefined> {
    const db = await makeDb();
    const user = db.users.insertOne(userEntity);
    return user;
  };
  return Object.freeze({
    createUser,
    getByUsername
  });
};
