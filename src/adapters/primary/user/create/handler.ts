import type { APIGatewayProxyEvent } from "aws-lambda";

import { isCreateUserUseCaseRequestType } from "./requestTypeAssertion";
import { isValidRequest } from "./requestValidation";
import { ResponseBuilder } from "@frameworks/helpers/response-builder";
import { BodyBuilder } from "@frameworks/helpers/body-builder";
import { createUserUseCase } from "@domains/usecases/user/create-user-usecase";
import { lambdaErrorBoundary } from "@frameworks/helpers/lambda-error-boundary";
import { UserDynamoDBRepository } from "@adapters/secondary/repositories/user-repository";

const repository = new UserDynamoDBRepository();

const main = async (event: APIGatewayProxyEvent) => {
  const body = new BodyBuilder().build(event, isCreateUserUseCaseRequestType);

  if (!isValidRequest(body)) {
    //valida�oes de integridade
    return ResponseBuilder.build(400, "Invalid Request");
  }

  const response = await createUserUseCase(body, repository);
  return ResponseBuilder.build(200, response);
};

export const handler = lambdaErrorBoundary(main);
