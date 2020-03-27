import { UserRepository } from "../../repositories/makeUserRepository";
import { Credentials } from "../../types/Credentials";
import { compare } from "bcryptjs";

type MakeLoginUseCaseParams = {
  userRepository: UserRepository;
  uuid: () => string;
  compare: typeof compare;
};
export type LoginUseCase = (
  credentials: Credentials
) => Promise<string | undefined>;
export const makeLoginUseCase = function makeLoginUseCase({
  userRepository,
  uuid
}: MakeLoginUseCaseParams): LoginUseCase {
  return async function loginUseCase({
    username,
    password
  }): Promise<string | undefined> {
    try {
      const user = await userRepository.getByUsername(username);
      if (user) {
        const passwordMatched = await compare(password, user.password);
        if (passwordMatched) {
          // TODO: save session id for future authentication
          return uuid();
        }
      }
      return;
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
};
