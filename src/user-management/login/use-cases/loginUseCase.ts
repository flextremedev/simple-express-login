import { makeLoginUseCase } from "./makeLoginUseCase";
import { userRepository } from "../../repositories/userRepository";
import { compare } from "bcryptjs";

export const login = makeLoginUseCase({ userRepository, compare });
