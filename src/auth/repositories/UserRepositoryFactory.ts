import { UserEntity } from "../entity/User";
import { Repository } from "../../common/models/Repository";
type MakeDb = () => Promise<DBClient>;
const mockDb = {
  users: [{ username: "username", password: "password" }]
};
export type DBClient = {
  users: {
    findOne: (username: string) => Promise<UserEntity | undefined>;
  };
};
const mockDbClient: DBClient = {
  users: {
    findOne: (username): Promise<UserEntity | undefined> =>
      new Promise(res => {
        const user = mockDb.users.find(user => user.username === username);
        res(user);
      })
  }
};
export const makeDb: MakeDb = () => new Promise(res => res(mockDbClient));

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
