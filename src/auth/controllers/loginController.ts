import { login } from "../use-cases/loginUseCase";
import { makeLoginController } from "./makeLoginController";

export const loginController = makeLoginController({ login });
