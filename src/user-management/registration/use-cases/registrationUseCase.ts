import { makeRegistrationUseCase } from "./makeRegistrationUseCase";
import { userRepository } from "../../repositories/userRepository";
export const registrationUseCase = makeRegistrationUseCase({
  userRepository,
});
