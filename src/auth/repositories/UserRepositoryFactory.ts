import { MakeDb } from "../../common/db/makeDb";
import { UserEntity } from "../entities/User";
export class UserRepository {
  constructor(private makeDb: MakeDb) {}
  static create(makeDb: MakeDb): UserRepository {
    return new this(makeDb);
  }
  getByUsername = async (username: string): Promise<UserEntity | undefined> => {
    const db = await this.makeDb();
    const user = db.users.findOne(username);
    return user;
  };
}
