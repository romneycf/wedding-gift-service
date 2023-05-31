import { APIGatewayProxyEvent } from "aws-lambda";

export class Bodybuilder {
    //O segundo parametro dessa função é uma outra função que afere o tipo do parametro passado à ela
    //e garante que seja do tipo determinado ('is T').
    //Ex: para o handler do user/create (linha 13) a typeAssertFunction é a isCreateUserUseCaseRequestType
    //e nela o 'T' é CreateUserUseCaseRequest, então basicamente aqui na linha 16 estamos validando se
    //o body é do tipo CreateUserUseCaseRequest.
    build<T>(event: APIGatewayProxyEvent, typeAssertFunction: (req: unknown) => req is T): T {
        if (typeof event !== 'object') {
            throw new Error("Formato inválido");
        }
        let body = event;
        if (event.headers) {
            body = JSON.parse(event.body || '');
        }
        if (!typeAssertFunction(body)) {
            throw new Error("Event não é do tipo esperado.");
        }
        return body;
    }
}