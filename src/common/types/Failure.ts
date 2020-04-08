import { Success } from "./Success";

export class Failure<E, V> {
  private value: E;

  constructor(value: E) {
    this.value = value;
  }

  public isFailure(): this is Failure<E, V> {
    return true;
  }

  public isSuccess(): this is Success<E, V> {
    return false;
  }

  public getValue(): E {
    return this.value;
  }
}
