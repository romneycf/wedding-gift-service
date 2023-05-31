//ESSE VAI SER A NOVA ROTA DE ENTRADA, RESPONSABILIDADE APENAS DE VALIDAR INTEGRIDADE DO PAYLOAD E CHAMAR O USECASE
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ResponseBuilder } from "../../../../helpers/response-builder";
import { CreateUserUseCaseRequest, createUserUseCase } from "../../../../usecases/user/create-user-usecase";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { Bodybuilder } from "../../handler";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const body = new Bodybuilder().build(event, isCreateUserUseCaseRequestType);
        if (!validateRequest(body)) {//validaçoes de integridade
            return ResponseBuilder.response(400, 'Inválid Request');
        }
        const repository = new UserDynamoDBRepository();
        const response = await createUserUseCase(body, repository);
        return ResponseBuilder.response(200, response);
    } catch (e) {
        return ResponseBuilder.response(500, "Unknown error");
    }
};
//REQUESTYPEASSERTION
function isCreateUserUseCaseRequestType(request: unknown): request is CreateUserUseCaseRequest {
    if (typeof request !== 'object' || request === null || request === undefined) {
        return false
    }
    if (!('name' in request) || !('password' in request) || !('email' in request)) {
        return false
    }
    if (typeof request.name !== 'string' || typeof request.email !== 'string' || typeof request.password !== 'string') {
        return false
    }
    return true;
}
// TODO: adicionar mais validações do objeto request
//REQUESTVALIDATION
function validateRequest(request: CreateUserUseCaseRequest): boolean {
    if(!request.email.includes('@')){
        return false;
    }
    return true;
}