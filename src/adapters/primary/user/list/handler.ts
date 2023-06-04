import type { APIGatewayProxyResult } from "aws-lambda";

import { listUserUseCase } from "../../../../domains/usecases/user/list-user-usecase";
import { ResponseBuilder } from "../../../../frameworks/helpers/response-builder";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
const repository = new UserDynamoDBRepository();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const response = await listUserUseCase(repository);
    return ResponseBuilder.build(200, response);
  } catch (e) {
    return ResponseBuilder.build(500, e);
  }
};
