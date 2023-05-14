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
}
