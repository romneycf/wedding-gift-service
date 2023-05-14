import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserRepository } from "./adapters/secondary/repositories/user-repository";
import { User } from "./entities/user";
import { ResponseBuilder } from "./helpers/response-builder";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //CONSTRUINDO OBJETO DE REQUISICAO (DESTRUCT) 
  const { name, email, password } = JSON.parse(event.body || "");
  const user = new User(name, email, password);
  //TODO: VALIDAR OBJETO DE REQUISICAO

  try {
    await new UserRepository().create(user);
  } catch (e) {
    return ResponseBuilder.response(500, e);
  }
  console.log("Usuario Criado com sucesso")
  return ResponseBuilder.response(201, user);
};
