import { CreateUserUseCaseRequest } from "../../../../usecases/user/create-user-usecase";

// TODO: adicionar mais valida��es do objeto request
export function isValidRequest(request: CreateUserUseCaseRequest): boolean {
    if (!request.email.includes('@')) {
        return false;
    }
    return true;
}
