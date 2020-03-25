import { Repository } from "../../common/models/Repository";
import { MakeDb } from "../../common/moin/makeDb";
import { UserEntity } from "../entities/User";
export class UserRepository implements Repository<UserEntity> {
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
