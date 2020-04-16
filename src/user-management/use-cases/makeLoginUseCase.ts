import { UserRepository } from "../repositories/makeUserRepository";
import { Credentials } from "../types/Credentials";
import { Result } from "../../common/types/Result";
import { LoginError } from "../errors/LoginError";
import { UserEntity } from "../entities/User";
import { succeed } from "../../common/utils/succeed";
import { fail } from "../../common/utils/fail";

type MakeLoginUseCaseParams = {
  userRepository: UserRepository;
  compare: (s: string, hash: string) => Promise<boolean>;
};
export type LoginUseCase = (
  credentials: Credentials
) => Promise<Result<LoginError, UserEntity>>;
export const makeLoginUseCase = function makeLoginUseCase({
  userRepository,
  compare,
}: MakeLoginUseCaseParams): LoginUseCase {
  return async function loginUseCase({
    username,
    password,
  }): Promise<Result<LoginError, UserEntity>> {
    try {
      const user = await userRepository.getByUsername(username);
      if (user) {
        const passwordMatched = await compare(password, user.password);
        if (passwordMatched) {
          return succeed(user);
        }
      }
      return fail(LoginError.create());
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
};
