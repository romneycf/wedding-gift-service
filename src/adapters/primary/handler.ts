import { APIGatewayProxyEvent } from "aws-lambda";
//TODO: renomear arquivo e jogar para helper
export class Bodybuilder {
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