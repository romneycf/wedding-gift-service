import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserDynamoDBRepository } from "./adapters/secondary/repositories/user-repository";
import { ResponseBuilder } from "./helpers/response-builder";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { PK } = JSON.parse(event.body || "");
  try {
    await new UserDynamoDBRepository().delete(PK);
  } catch (e) {
    return ResponseBuilder.response(500, e);
  }
  console.log("Usuario Deletado com sucesso")
  return ResponseBuilder.response(202, "Usuario deletado");
};
