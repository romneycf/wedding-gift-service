import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { UserDynamoDBRepository } from "../../../secondary/repositories/user-repository";
import { BodyBuilder } from "../../../../frameworks/helpers/body-builder";
import { isValidRequest } from "./requestValidation";
import { isCreateUserUseCaseRequestType } from "./requestTypeAssertion";
import { lambdaErrorBoundary } from "../../../../frameworks/helpers/lambda-error-boundary";
import { createUserUseCase } from "../../../../domains/usecases/user/create-user-usecase";
import { ResponseBuilder } from "../../../../frameworks/helpers/response-builder";

const main = async (event: APIGatewayProxyEvent) => {
  const body = new BodyBuilder().build(event, isCreateUserUseCaseRequestType);

  if (!isValidRequest(body)) {
    //valida�oes de integridade
    return ResponseBuilder.build(400, "Invalid Request");
  }

  const repository = new UserDynamoDBRepository();

  const response = await createUserUseCase(body, repository);
  return ResponseBuilder.build(200, response);
};

export const handler = lambdaErrorBoundary(main);
