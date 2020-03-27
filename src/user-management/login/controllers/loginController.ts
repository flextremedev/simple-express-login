import { makeLoginController } from "./makeLoginController";
import { login } from "../use-cases/loginUseCase";

export const loginController = makeLoginController({ login });
