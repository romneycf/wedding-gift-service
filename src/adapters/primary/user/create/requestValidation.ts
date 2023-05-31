import { CreateUserUseCaseRequest } from "../../../../usecases/user/create-user-usecase";

// TODO: adicionar mais validações do objeto request
export function validateRequest(request: CreateUserUseCaseRequest): boolean {
    if (!request.email.includes('@')) {
        return false;
    }
    return true;
}
