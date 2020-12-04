import { MakeDb } from "../../common/db/makeDb";
import type { UserEntity } from "../entities/User";
import { Users } from "../types/Users";
export type UserRepository = Readonly<{
  createUser: (userEntity: UserEntity) => Promise<UserEntity | undefined>;
  getByUsername: (username: string) => Promise<UserEntity | undefined>;
  getUsers: () => Promise<Users>;
}>;
export const makeUserRepository = (makeDb: MakeDb): UserRepository => {
  const getByUsername = async function getByUsername(
    username: string
  ): Promise<UserEntity | undefined> {
    const db = await makeDb();
    const user = db.users.findOne(username);
    return user;
  };
  const createUser = async function createUser(userEntity: UserEntity): Promise<UserEntity | undefined> {
    const db = await makeDb();
    const user = db.users.insertOne(userEntity);
    return user;
  };
  const getUsers = async function getUsers(): Promise<Users>{
    const db = await makeDb();
    const users = db.users.getAll();
    return users;
  }
  return Object.freeze({
    createUser,
    getByUsername,
    getUsers
  });
};
