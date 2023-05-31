import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserDynamoDBRepository } from "./adapters/secondary/repositories/user-repository";
import { ResponseBuilder } from "./helpers/response-builder";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const response = await new UserDynamoDBRepository().scan();
    const users = response.Items?.map((item) => unmarshall(item));
    return ResponseBuilder.response(200, users);
  } catch (e) {
    return ResponseBuilder.response(500, e);
  }
};
