import { InvalidPasswordException } from "@domains/exceptions/InvalidPasswordException";

export class User {
  PK: string;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.PK = `USER#${email}`;
    this.name = name;
    this.email = email;
    this.password = password;
    const isvalid = this.validate();
    if (!isvalid) {
      throw new Error("Usuário inválido"); //ESSE ERRO NAO ESTA VOLTANDO PARA O USECASE
    }
  }

  private validate(): boolean {
    //AQUI EU POSSO VALIDAR SE CADA CAMPO ESTA CORRETO E SUAS RESPECTIVAS MASCARAS TALZ
    if (this.password.length < 6) {
      throw new InvalidPasswordException(
        "A senha deve ter no mínimo 6 caracteres"
      );
    }
    return true;
  }
}
