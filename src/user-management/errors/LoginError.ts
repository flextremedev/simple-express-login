import { AppError } from "../../common/types/AppError";

export class LoginError extends AppError {
  private constructor() {
    super(1, "Login failed", "Invalid username or password", 401);
  }

  public static create(): LoginError {
    return new LoginError();
  }
}
