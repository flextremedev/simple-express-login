import { v4 as uuid } from "uuid";
import { makeLoginUseCase } from "./makeLoginUseCase";
import { userRepository } from "../../repositories/userRepository";
import { compare } from "bcryptjs";

export const login = makeLoginUseCase({ userRepository, uuid, compare });
