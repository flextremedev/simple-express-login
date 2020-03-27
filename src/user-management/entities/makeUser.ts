import { v4 as uuid } from "uuid";
import { hash, genSalt } from "bcryptjs";
import { UserEntity } from "./User";
import { Credentials } from "../types/Credentials";
type BuildMakeUserParams = {
  uuid: () => string;
  hash: typeof hash;
  genSalt: typeof genSalt;
};
export const buildMakeUser = function buildMakeUser({
  uuid,
  hash
}: BuildMakeUserParams) {
  return async function makeUser({
    username,
    password
  }: Credentials): Promise<UserEntity> {
    const id = uuid();
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return Object.freeze({ id, username, password: hashedPassword });
  };
};

export const makeUser = buildMakeUser({ uuid, hash, genSalt });
