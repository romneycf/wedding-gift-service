import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserRepository } from "./adapters/secondary/repositories/user-repository";
import { User } from "./entities/user";
import { ResponseBuilder } from "./helpers/response-builder";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "");
  if (!body.name || !body.email || !body.password) {
    return ResponseBuilder.response(400, 'Dados invalidos');
  }
  const { name, email, password } = body;
  const user = new User(name, email, password);
  try {
    await new UserRepository().create(user);
  } catch (e) {
    return ResponseBuilder.response(500, e);
  }
  console.log("Usuario Criado com sucesso")
  return ResponseBuilder.response(201, user);
};
