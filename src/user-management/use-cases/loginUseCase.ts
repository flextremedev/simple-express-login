import { makeLoginUseCase } from "./makeLoginUseCase";
import { compare } from "bcryptjs";
import { userRepository } from "../repositories/userRepository";
export const loginUseCase = makeLoginUseCase({ userRepository, compare });
