import { Failure } from "./Failure";

export class Success<E, V> {
  private value: V;

  constructor(value: V) {
    this.value = value;
  }

  public isFailure(): this is Failure<E, V> {
    return false;
  }

  public isSuccess(): this is Success<E, V> {
    return true;
  }

  public getValue(): V {
    return this.value;
  }
}
