import { makeGetUsersController } from "./makeGetUsersController";
import { getUsersUseCase } from "../use-cases/getUsersUseCase";

export const getUsersController = makeGetUsersController({ getUsersUseCase });
