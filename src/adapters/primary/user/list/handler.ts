import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { listUserUseCase } from "../../../../domains/usecases/user/list-user-usecase";
import { ResponseBuilder } from "../../../../frameworks/helpers/response-builder";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const repository = new UserDynamoDBRepository();
    const response = await listUserUseCase(repository);
    return ResponseBuilder.build(200, response);
  } catch (e) {
    return ResponseBuilder.build(500, e);
  }
};
