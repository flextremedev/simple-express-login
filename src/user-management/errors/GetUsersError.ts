import { AppError } from "../../common/types/AppError";

export class GetUsersError extends AppError {
  private constructor() {
    super(1, "Get Users failed", "Something went wrong", 500);
  }

  public static create(): GetUsersError {
    return new GetUsersError();
  }
}
