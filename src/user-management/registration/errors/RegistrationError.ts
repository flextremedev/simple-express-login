import { AppError } from "../../../common/types/AppError";

export class RegistrationError extends AppError {
  private constructor() {
    super(1, "Registration failed", "Username already taken", 409);
  }

  public static create(): RegistrationError {
    return new RegistrationError();
  }
}
