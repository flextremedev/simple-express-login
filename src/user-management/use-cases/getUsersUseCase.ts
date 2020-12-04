import { makeGetUsersUseCase } from "./makeGetUsersUseCase";
import { userRepository } from "../repositories/userRepository";

export const getUsersUseCase = makeGetUsersUseCase({ userRepository });
