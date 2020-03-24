import { v4 as uuid } from "uuid";
import { makeLoginUseCase } from "./makeLoginUseCase";
import { userRepository } from "../repositories/UserRepository";

export const login = makeLoginUseCase({ userRepository, uuid });
