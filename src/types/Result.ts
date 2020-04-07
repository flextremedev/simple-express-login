import { Failure } from "./Failure";
import { Success } from "./Success";
import { AppError } from "./AppError";

export type Result<E extends AppError, V> = Failure<E, V> | Success<E, V>;
