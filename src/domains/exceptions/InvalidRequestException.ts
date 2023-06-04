import { DomainException } from "./domain-exception";

export class InvalidRequestException extends DomainException {
  override name = "InvalidRequestException";
  constructor(message = "Invalid request") {
    super(message, true, 400);
    Object.setPrototypeOf(this, InvalidRequestException.prototype);
  }
}
