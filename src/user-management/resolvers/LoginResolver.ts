import { Resolver, Mutation, Arg } from "type-graphql";
import { makeUser } from "../entities/makeUser";
@Resolver()
export class LoginResolver {
  @Mutation(() => String)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<string | null> {
    const { id } = await makeUser({ username, password });
    return id;
  }
}
