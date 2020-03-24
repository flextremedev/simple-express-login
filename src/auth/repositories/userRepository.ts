import { UserRepository } from "./UserRepositoryFactory";
import { makeDb } from "./UserRepositoryFactory";
export const userRepository = UserRepository.create(makeDb);
