export class Validator {
    validateApiGatewayEventForUserCreation(body: string | null) {
        if (typeof body !== "string") {
            throw new Error("Body inválido");
        }
        const user = JSON.parse(body);
        if (!user.name) {
            throw new Error("Nome inválido");
        }
        if (!user.email) {
            throw new Error("Email inválido");
        }
        if (!user.password) {
            throw new Error("Password inválido");
        }
        //todo validar tamanho, mascara (email, regra de password)
    }
}