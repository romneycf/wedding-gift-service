import { DeleteUserUseCaseRequest } from "@domains/usecases/user/delete-user-usecase";

export function isDeleteUserUseCaseRequestType(
  request: unknown
): request is DeleteUserUseCaseRequest {
  if (
    typeof request !== "object" ||
    request === null ||
    request === undefined
  ) {
    return false;
  }
  if (!("PK" in request)) {
    return false;
  }
  if (typeof request.PK !== "string") {
    return false;
  }
  return true;
}
