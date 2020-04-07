import { Success } from "./Success";

export class Failure<E, V> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  isFailure(): this is Failure<E, V> {
    return true;
  }

  isSuccess(): this is Success<E, V> {
    return false;
  }
}
