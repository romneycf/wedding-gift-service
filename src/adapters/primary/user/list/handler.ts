import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ResponseBuilder } from "../../../../helpers/response-builder";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { listUserUseCase } from "../../../../usecases/user/list-user-usecase";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const repository = new UserDynamoDBRepository();
        const response = await listUserUseCase(repository);
        return ResponseBuilder.response(200, response);
    } catch (e) {
        return ResponseBuilder.response(500, e);
    }
};