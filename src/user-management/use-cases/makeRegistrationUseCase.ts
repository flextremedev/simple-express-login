import { UserRepository } from "../repositories/makeUserRepository";
import { Credentials } from "../types/Credentials";
import { Result } from "../../common/types/Result";
import { RegistrationError } from "../errors/RegistrationError";
import { UserEntity } from "../entities/User";
import { makeUser } from "../entities/makeUser";
import { succeed } from "../../common/utils/succeed";
import { fail } from "../../common/utils/fail";

type MakeRegistrationUseCaseParams = {
  userRepository: UserRepository;
};
export type RegistrationUseCase = ({
  username,
  password,
}: Credentials) => Promise<Result<RegistrationError, UserEntity>>;
export const makeRegistrationUseCase = ({
  userRepository,
}: MakeRegistrationUseCaseParams): RegistrationUseCase => {
  return async function registrationUseCase({
    username,
    password,
  }: Credentials): Promise<Result<RegistrationError, UserEntity>> {
    const user = await makeUser({ username, password });
    const maybeCreatedUser = await userRepository.createUser(user);
    if (maybeCreatedUser) {
      return succeed(maybeCreatedUser);
    }
    return fail(RegistrationError.create());
  };
};
