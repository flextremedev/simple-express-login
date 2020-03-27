import { makeRegistrationUseCase } from "./makeRegistrationUseCase";
import { userRepository } from "../../repositories/userRepository";
import { v4 as uuid } from "uuid";
export const registrationUseCase = makeRegistrationUseCase({
  userRepository,
  uuid
});
