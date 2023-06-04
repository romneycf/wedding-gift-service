import { DomainException } from "./domain-exception";

export class InvalidPasswordException extends DomainException {
  override name = "InvalidPasswordException";
  constructor(message = "Invalid password") {
    super(message, true, 400);
    Object.setPrototypeOf(this, InvalidPasswordException.prototype);
  }
}
