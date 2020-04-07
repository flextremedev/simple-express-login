import { Result } from "../types/Result";
import { Failure } from "../types/Failure";
import { AppError } from "../types/AppError";

export const fail = <E extends AppError, V>(err: E): Result<E, V> => {
  return new Failure<E, V>(err);
};
