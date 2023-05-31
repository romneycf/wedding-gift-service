import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Bodybuilder } from "../../../../helpers/body-builder";
import { isDeleteUserUseCaseRequestType } from "./requestTypeAssertion";
import { validateRequest } from "./requestValidation";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { ResponseBuilder } from "../../../../helpers/response-builder";
import { deleteUserUseCase } from "../../../../usecases/user/delete-user-usecase";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const body = new Bodybuilder().build(event, isDeleteUserUseCaseRequestType);
        if (!validateRequest(body)) {
            return ResponseBuilder.response(400, 'Inválid Request');
        }
        const repository = new UserDynamoDBRepository();
        const response = await deleteUserUseCase(body, repository);
        return ResponseBuilder.response(202, response);
    } catch (e) {
        return ResponseBuilder.response(500, "Unknown error");
    }
};