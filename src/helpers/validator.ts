export class Validator {
    validateApiGatewayEventForUserCreation(body: string | null) {
        if (typeof body !== "string") {
            throw new Error("Body inv�lido");
        }
        const user = JSON.parse(body);
        if (!user.name) {
            throw new Error("Nome inv�lido");
        }
        if (!user.email) {
            throw new Error("Email inv�lido");
        }
        if (!user.password) {
            throw new Error("Password inv�lido");
        }
        //todo validar tamanho, mascara (email, regra de password)
    }
}