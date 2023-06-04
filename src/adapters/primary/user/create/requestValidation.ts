import { InvalidRequestException } from "@domains/exceptions/InvalidRequestException";
import { DomainException } from "@domains/exceptions/domain-exception";
import { CreateUserUseCaseRequest } from "@domains/usecases/user/create-user-usecase";

// TODO: adicionar mais valida��es do objeto request
export function assertRequestIsValid(
  request: CreateUserUseCaseRequest
): DomainException | void {
  if (!request.email.includes("@")) {
    return new InvalidRequestException("E-mail não contém @");
  }
}
