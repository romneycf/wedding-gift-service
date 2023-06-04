export class User {
    PK: string
    name: string
    email: string
    password: string

    constructor(name: string, email: string, password: string) {
        this.PK = `USER#${email}`;
        this.name = name;
        this.email = email;
        this.password = password;
        const isvalid = this.validate(this);
        if(!isvalid) {
            throw new Error ('Usuário inválido');//ESSE ERRO NAO ESTA VOLTANDO PARA O USECASE
        }
    }

    private validate(user: User):boolean {
        //AQUI EU POSSO VALIDAR SE CADA CAMPO ESTA CORRETO E SUAS RESPECTIVAS MASCARAS TALZ
        if(user.password.length < 6){
            return false
        }
        return true;
    }
}
