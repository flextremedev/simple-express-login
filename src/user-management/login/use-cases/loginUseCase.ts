import { makeLoginUseCase } from "./makeLoginUseCase";
import { userRepository } from "../../repositories/userRepository";
import { compare } from "bcryptjs";

export const loginUseCase = makeLoginUseCase({ userRepository, compare });
