import { CreateUserUseCaseRequest } from "../../../../usecases/user/create-user-usecase";

export function isCreateUserUseCaseRequestType(request: unknown): request is CreateUserUseCaseRequest {
    if (typeof request !== 'object' || request === null || request === undefined) {
        return false;
    }
    if (!('name' in request) || !('password' in request) || !('email' in request)) {
        return false;
    }
    if (typeof request.name !== 'string' || typeof request.email !== 'string' || typeof request.password !== 'string') {
        return false;
    }
    return true;
}