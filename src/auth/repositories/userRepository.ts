import { UserRepository } from "./UserRepositoryFactory";
import { makeDb } from "../../common/moin/makeDb";
export const userRepository = UserRepository.create(makeDb);
