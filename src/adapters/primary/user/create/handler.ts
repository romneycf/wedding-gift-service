import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ResponseBuilder } from "../../../../helpers/response-builder";
import { createUserUseCase } from "../../../../usecases/user/create-user-usecase";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { Bodybuilder } from "../../../../helpers/body-builder";
import { validateRequest } from "./requestValidation";
import { isCreateUserUseCaseRequestType } from "./requestTypeAssertion";

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