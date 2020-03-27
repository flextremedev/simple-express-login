import { UserEntity } from "./User";
import { v4 as uuid } from "uuid";
import { Credentials } from "../types/Credentials";
type BuildMakeUserParams = {
  uuid: () => string;
};
export const buildMakeUser = function buildMakeUser({
  uuid
}: BuildMakeUserParams) {
  return function makeUser({ username, password }: Credentials): UserEntity {
    const id = uuid();
    return Object.freeze({ id, username, password });
  };
};

export const makeUser = buildMakeUser({ uuid });
