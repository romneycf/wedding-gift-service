import { APIGatewayProxyEvent } from "aws-lambda";

export class Bodybuilder {
    invocationValidator(event: APIGatewayProxyEvent) {
        if (typeof event !== 'object') {
            throw new Error("Formato inv�lido");
        }
        if (event.headers) {
            return JSON.parse(event.body || '');
        }
        return event;
    }
}