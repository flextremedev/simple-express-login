import { UserRepository } from "../../repositories/makeUserRepository";
import { Credentials } from "../../types/Credentials";

type MakeLoginUseCaseParams = {
  userRepository: UserRepository;
  uuid: () => string;
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
      if (user?.password === password) {
        // TODO: save session id for future authentication
        return uuid();
      }
      return;
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };
};
