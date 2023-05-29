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
    }

    //CRIAR METODOS DA CLASS USER QUE SAO RESPONSAVEIS POR CRIAR/ALTERAR, BUSCAR E DELETAR UM USUARIO
    //ESSES METODOS VAO ESPERAR COMO PARAMETROS 2 TROÇOS (INTERFACES??)(ADAPTAR A CHEGADA DO DADO E SAIDA)
}
