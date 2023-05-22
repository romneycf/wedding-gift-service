import { APIGatewayProxyEvent } from "aws-lambda";

export class Bodybuilder {
    invocationValidator(event: APIGatewayProxyEvent) {
        if (typeof event !== 'object') {
            throw new Error("Formato inv�lido");
        }
        try {
            if (event.body) {
                return JSON.parse(event.body);
            }
            return event
        }
        catch (e) {
            console.log(e)
        }
    }
}