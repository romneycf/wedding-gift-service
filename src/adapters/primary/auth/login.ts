import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ResponseBuilder } from "../../../frameworks/helpers/response-builder";
import { UserDynamoDBRepository } from "../../secondary/repositories/user-repository";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "");
  if (!body.email || !body.password) {
    return ResponseBuilder.build(400, 'Dados invalidos');
  }
  const { email, password } = body;
  try {
    const response = await new UserDynamoDBRepository().getUser(email, password);
    //const users = response.Items?.map((item) => unmarshall(item));
    return ResponseBuilder.build(200, response);
  } catch (e) {
    return ResponseBuilder.build(500, e);
  }
};
