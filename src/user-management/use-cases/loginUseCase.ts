import { makeLoginUseCase } from "./makeLoginUseCase";
import { userRepository } from "../repositories/userRepository";
import { compare } from "../adapters/compare";
export const loginUseCase = makeLoginUseCase({ userRepository, compare });
