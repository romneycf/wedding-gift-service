export class DomainException extends Error {
  override name = "DomainException";
  expose: boolean;
  statusCode: number;
  constructor(message: string, expose = false, statusCode = 500) {
    super(message);
    this.expose = expose;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}
