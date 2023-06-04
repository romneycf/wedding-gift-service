import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BodyBuilder } from "@frameworks/helpers/body-builder";
import { isDeleteUserUseCaseRequestType } from "./requestTypeAssertion";
import { validateRequest } from "./requestValidation";
import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { ResponseBuilder } from "@frameworks/helpers/response-builder";
import { deleteUserUseCase } from "@domains/usecases/user/delete-user-usecase";

const repository = new UserDynamoDBRepository();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = new BodyBuilder().build(event, isDeleteUserUseCaseRequestType);
    if (!validateRequest(body)) {
      return ResponseBuilder.build(400, "Invalid Request");
    }

    const response = await deleteUserUseCase(body, repository);
    return ResponseBuilder.build(202, response);
  } catch (e) {
    return ResponseBuilder.build(500, "Unknown error");
  }
};
