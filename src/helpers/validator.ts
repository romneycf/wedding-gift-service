export class Validator {
    validateApiGatewayEventForUserCreation(body: {
        name: string,
        email: string,
        password: string
    }) {
        if (typeof body !== "object") {
            throw new Error("Body inv�lido");
        }
        const user = body;
        if (!body.name) {
            throw new Error("Nome inv�lido");
        }
        if (!body.email) {
            throw new Error("Email inv�lido");
        }
        if (!body.password) {
            throw new Error("Password inv�lido");
        }
        //todo validar tamanho, mascara (email, regra de password)
    }
}