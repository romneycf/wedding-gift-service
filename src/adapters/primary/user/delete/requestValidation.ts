import { DeleteUserUseCaseRequest } from "../../../../usecases/user/delete-user-usecase";

// TODO: adicionar mais valida��es do objeto request
export function validateRequest(request: DeleteUserUseCaseRequest): boolean {
    if (!request.PK.includes('@')) {
        return false;
    }
    return true;
}
