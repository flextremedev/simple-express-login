import { compare } from "bcryptjs";
import { UserRepository } from "../../repositories/makeUserRepository";
import { Credentials } from "../../types/Credentials";
import { Result } from "../../../types/Result";
import { LoginError, LoginErrorType } from "../../errors/LoginError";
import { succeed } from "../../../utils/succeed";
import { fail } from "../../../utils/fail";

type MakeLoginUseCaseParams = {
  userRepository: UserRepository;
  uuid: () => string;
  compare: typeof compare;
};
export type LoginUseCase = (
  credentials: Credentials
) => Promise<Result<LoginErrorType, string>>;
export const makeLoginUseCase = function makeLoginUseCase({
  userRepository,
  uuid,
}: MakeLoginUseCaseParams): LoginUseCase {
  return async function loginUseCase({
    username,
    password,
  }): Promise<Result<LoginErrorType, string>> {
    try {
      const user = await userRepository.getByUsername(username);
      if (user) {
        const passwordMatched = await compare(password, user.password);
        if (passwordMatched) {
          // TODO: save session id for future authentication
          return succeed(uuid());
        }
      }
      return fail(LoginError);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
};
