import { UserRepository } from "../../repositories/makeUserRepository";
import { Credentials } from "../../types/Credentials";
import { makeUser } from "../../entities/makeUser";

type MakeRegistrationUseCaseParams = {
  userRepository: UserRepository;
  uuid: () => string;
};
export type RegistrationUseCase = ({
  username,
  password
}: Credentials) => Promise<string | undefined>;
export const makeRegistrationUseCase = ({
  userRepository,
  uuid
}: MakeRegistrationUseCaseParams): RegistrationUseCase => {
  return async function registrationUseCase({
    username,
    password
  }: Credentials): Promise<string | undefined> {
    const user = makeUser({ username, password });
    const maybeCreatedUser = await userRepository.createUser(user);
    if (maybeCreatedUser) {
      const sid = uuid();
      return sid;
    }
    return maybeCreatedUser;
  };
};
