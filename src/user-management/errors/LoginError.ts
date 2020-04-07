export type LoginErrorType = {
  code: number;
  title: string;
  message: string;
  status: number;
};
export const LoginError: LoginErrorType = {
  code: 1,
  title: "Login failed",
  message: "Invalid username or password",
  status: 401,
};
