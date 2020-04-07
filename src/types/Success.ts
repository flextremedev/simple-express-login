import { Failure } from "./Failure";

export class Success<E, V> {
  readonly value: V;

  constructor(value: V) {
    this.value = value;
  }

  isFailure(): this is Failure<E, V> {
    return false;
  }

  isSuccess(): this is Success<E, V> {
    return true;
  }
}
