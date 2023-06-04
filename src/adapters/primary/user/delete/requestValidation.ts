import { DeleteUserUseCaseRequest } from "../../../../usecases/user/delete-user-usecase";

// TODO: adicionar mais validações do objeto request
export function validateRequest(request: DeleteUserUseCaseRequest): boolean {
    if (!request.PK.includes('@')) {
        return false;
    }
    return true;
}
