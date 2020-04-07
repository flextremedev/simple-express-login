import { Result } from "../types/Result";
import { Success } from "../types/Success";
import { AppError } from "../types/AppError";

export const succeed = <E extends AppError, V>(val: V): Result<E, V> => {
  return new Success<E, V>(val);
};
