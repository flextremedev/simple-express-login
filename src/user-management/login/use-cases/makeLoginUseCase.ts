import { compare } from "bcryptjs";
import { UserRepository } from "../../repositories/makeUserRepository";
import { Credentials } from "../../types/Credentials";
import { LoginError } from "../errors/LoginError";
import { succeed } from "../../../common/utils/succeed";
import { fail } from "../../../common/utils/fail";
import { Result } from "../../../common/types/Result";

type MakeLoginUseCaseParams = {
  userRepository: UserRepository;
  uuid: () => string;
  compare: typeof compare;
};
export type LoginUseCase = (
  credentials: Credentials
) => Promise<Result<LoginError, string>>;
export const makeLoginUseCase = function makeLoginUseCase({
  userRepository,
  uuid,
}: MakeLoginUseCaseParams): LoginUseCase {
  return async function loginUseCase({
    username,
    password,
  }): Promise<Result<LoginError, string>> {
    try {
      const user = await userRepository.getByUsername(username);
      if (user) {
        const passwordMatched = await compare(password, user.password);
        if (passwordMatched) {
          // TODO: save session id for future authentication
          return succeed(uuid());
        }
      }
      return fail(LoginError.create());
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
};
