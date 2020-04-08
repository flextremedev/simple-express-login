import { Result } from "../types/Result";
import { AppError } from "../types/AppError";
import { Failure } from "../types/Failure";

export const fail = <E extends AppError, V>(err: E): Result<E, V> => {
  return new Failure<E, V>(err);
};
