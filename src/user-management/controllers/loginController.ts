import { makeLoginController } from "./makeLoginController";
import { loginUseCase } from "../use-cases/loginUseCase";

export const loginController = makeLoginController({ loginUseCase });
