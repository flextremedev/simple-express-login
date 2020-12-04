import { UserRepository } from "../repositories/makeUserRepository";
import { Result } from "../../common/types/Result";
import { AppError } from "../../common/types/AppError";
import { succeed } from "../../common/utils/succeed";
import { fail } from "../../common/utils/fail";
import { GetUsersError } from "../errors/GetUsersError";
import { Users } from "../types/Users";

type MakeGetUsersUseCaseParams = {
  userRepository: UserRepository;
};
export type GetUsersUseCase = () => Promise<Result<AppError, Users>>;
export const makeGetUsersUseCase = function makeGetUsersUseCase({
  userRepository,
}: MakeGetUsersUseCaseParams): GetUsersUseCase {
  return async function getUsersUseCase(): Promise<Result<AppError, Users>> {
    try {
      const users = await userRepository.getUsers();
      return succeed(users);
    } catch (e) {
      console.error(e);
      return fail(GetUsersError.create());
    }
  };
};
