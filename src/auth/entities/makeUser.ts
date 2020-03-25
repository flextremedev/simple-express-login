import { UserEntity } from "./User";

export const buildMakeUser = function buildMakeUser() {
  return function makeUser(username: string, password: string): UserEntity {
    return { username, password };
  };
};
