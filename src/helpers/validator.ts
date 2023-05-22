export class Validator {
    validateApiGatewayEventForUserCreation(body: {
        name: string,
        email: string,
        password: string
    }) {
        if (typeof body !== "object") {
            throw new Error("Body inválido");
        }
        const user = body;
        if (!body.name) {
            throw new Error("Nome inválido");
        }
        if (!body.email) {
            throw new Error("Email inválido");
        }
        if (!body.password) {
            throw new Error("Password inválido");
        }
        //todo validar tamanho, mascara (email, regra de password)
    }
}