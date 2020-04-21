import { UserEntity } from "./User";
import { Credentials } from "../types/Credentials";
import { hash, Hash } from "../adapters/hash";
import { generateSalt, GenerateSalt } from "../adapters/generateSalt";
import { GenerateId, generateId } from "../adapters/generateId";
type BuildMakeUserParams = {
  generateId: GenerateId;
  hash: Hash;
  generateSalt: GenerateSalt;
};
export const buildMakeUser = function buildMakeUser({
  generateId,
  hash,
  generateSalt,
}: BuildMakeUserParams) {
  return async function makeUser({
    username,
    password,
  }: Credentials): Promise<UserEntity> {
    const id = generateId();
    const salt = await generateSalt(10);
    const hashedPassword = await hash(password, salt);
    return Object.freeze({ id, username, password: hashedPassword });
  };
};

export const makeUser = buildMakeUser({ generateId, hash, generateSalt });
