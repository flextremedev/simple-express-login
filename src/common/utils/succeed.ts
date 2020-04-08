import { AppError } from "../types/AppError";
import { Result } from "../types/Result";
import { Success } from "../types/Success";

export const succeed = <E extends AppError, V>(val: V): Result<E, V> => {
  return new Success<E, V>(val);
};
