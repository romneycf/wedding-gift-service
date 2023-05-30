//ESSE VAI SER A NOVA ROTA DE ENTRADA, RESPONSABILIDADE APENAS DE VALIDAR PAYLOAD E CHAMAR O USECASE
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserRepository } from "../../../secondary/repositories/user-repository";
import { ResponseBuilder } from "../../../../helpers/response-builder";
import { Bodybuilder } from "../../handler";
import { createUserUseCase } from "../../../../usecases/user/create-user-usecase";
import { User } from "../../../../entities/user";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const body = new Bodybuilder().invocationValidator(event);
        const { name, email, password } = body;
        const user = new User(name, email, password);
        const repository = new UserRepository();
        const response = await createUserUseCase(user, repository);
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (e) {
        return ResponseBuilder.response(500, "Unknown error");
    }
};
