import { makeRegistrationController } from "./makeRegistrationController";
import { registrationUseCase } from "../use-cases/registrationUseCase";

export const registrationController = makeRegistrationController({
  registrationUseCase
});
