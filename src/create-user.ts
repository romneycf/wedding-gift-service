import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserRepository } from "./adapters/secondary/repositories/user-repository";
import { User } from "./entities/user";
import { ResponseBuilder } from "./helpers/response-builder";
import { Validator } from "./helpers/validator";
import { Bodybuilder } from "./adapters/primary/handler";
//CONSTRUINDO BODY/ CHAMANDO METODO .create()
//FAZER FUNCIONAR VIA INVOKE
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = new Bodybuilder().invocationValidator(event);
    try {
      new Validator().validateApiGatewayEventForUserCreation(body);
    }
    catch (e) {
      return ResponseBuilder.response(400, {
        name: e.name,
        message: e.message
      });
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
  }
  catch (e) {
    return ResponseBuilder.response(500, "Unknown error");
  }
};
