import { UserRepository } from "./UserRepositoryFactory";
import { makeDb } from "../../common/db/makeDb";
export const userRepository = UserRepository.create(makeDb);
