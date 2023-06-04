import type { APIGatewayProxyEvent } from "aws-lambda";

import { UserDynamoDBRepository } from "@adapters/secondary/repositories/user-repository";
import { createUserUseCase } from "@domains/usecases/user/create-user-usecase";
import { BodyBuilder } from "@frameworks/helpers/body-builder";
import { lambdaErrorBoundary } from "@frameworks/helpers/lambda-error-boundary";
import { ResponseBuilder } from "@frameworks/helpers/response-builder";
import { isCreateUserUseCaseRequestType } from "./requestTypeAssertion";
import { assertRequestIsValid } from "./requestValidation";

const repository = new UserDynamoDBRepository();

const main = async (event: APIGatewayProxyEvent) => {
  const body = new BodyBuilder().build(event, isCreateUserUseCaseRequestType);
  
  const error = assertRequestIsValid(body);

  if (error) return ResponseBuilder.buildDomainException(error);

  const response = await createUserUseCase(body, repository);
  return ResponseBuilder.build(200, response);
};

export const handler = lambdaErrorBoundary(main);
