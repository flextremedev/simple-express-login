import { makeDb } from "../../common/db/makeDb";
import { makeUserRepository } from "./makeUserRepository";
export const userRepository = makeUserRepository(makeDb);
