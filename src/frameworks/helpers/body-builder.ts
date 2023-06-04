import { APIGatewayProxyEvent } from "aws-lambda";

export class BodyBuilder {
  //O segundo parametro dessa fun��o � uma outra fun��o que afere o tipo do parametro passado � ela
  //e garante que seja do tipo determinado ('is T').
  //Ex: para o handler do user/create (linha 13) a typeAssertFunction � a isCreateUserUseCaseRequestType
  //e nela o 'T' � CreateUserUseCaseRequest, ent�o basicamente aqui na linha 16 estamos validando se
  //o body � do tipo CreateUserUseCaseRequest.
  build<T>(
    event: APIGatewayProxyEvent,
    typeAssertFunction: (req: unknown) => req is T
  ): T {
    if (typeof event !== "object") {
      throw new Error("Formato inválido");
    }
    let body = event;
    if (event.headers) {
      body = JSON.parse(event.body || "");
    }
    if (!typeAssertFunction(body)) {
      throw new Error("Event não é do tipo esperado.");
    }
    return body;
  }
}
