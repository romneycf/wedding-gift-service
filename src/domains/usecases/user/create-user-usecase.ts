//ESSE MANO VAI SER CHAMADO PELO ADAPTER PRIMARY FAZER O BERIMBOLO DE CRIAR O USUARIO
//ABSTRACAO PARA CRIAR UM USUARIO INDIFERENTE DE ONDE FOR EXECUTADO
//IMPORTANTE----- ELE NAO DEVE SABER NADA DO CARA QUE TA CHAMANDO ELE
import { User } from "../../entities/user";
import UserRepository from "../gateway/user-repository";

export async function createUserUseCase(
  {
    name, password, email
  }: CreateUserUseCaseRequest,
  repository: UserRepository
): Promise<User> {
  //QUANDO PASSO SENHA MENOR QUE 6 DIGITOS TA ESTOURANDO ERRO AQUI E NAO TEM CATCH, FARIA AQUI MSM ?
  const user = new User(name, email, password);
  await repository.create(user);
  return user;
}
export interface CreateUserUseCaseRequest {
  name: string;
  password: string;
  email: string;
}