import { v4 as uuid } from "uuid";
import { UserEntity } from "./User";
import { Credentials } from "../types/Credentials";
import { hash, Hash } from "../adapters/hash";
import { generateSalt, GenerateSalt } from "../adapters/generateSalt";
type BuildMakeUserParams = {
  uuid: () => string;
  hash: Hash;
  generateSalt: GenerateSalt;
};
export const buildMakeUser = function buildMakeUser({
  uuid,
  hash,
  generateSalt,
}: BuildMakeUserParams) {
  return async function makeUser({
    username,
    password,
  }: Credentials): Promise<UserEntity> {
    const id = uuid();
    const salt = await generateSalt(10);
    const hashedPassword = await hash(password, salt);
    return Object.freeze({ id, username, password: hashedPassword });
  };
};

export const makeUser = buildMakeUser({ uuid, hash, generateSalt });
