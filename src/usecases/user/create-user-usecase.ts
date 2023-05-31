//ESSE MANO VAI SER CHAMADO PELO ADAPTER PRIMARY FAZER O BERIMBOLO DE CRIAR O USUARIO
//ABSTRACAO PARA CRIAR UM USUARIO INDIFERENTE DE ONDE FOR EXECUTADO
//IMPORTANTE----- ELE NAO DEVE SABER NADA DO CARA QUE TA CHAMANDO ELE
import { UserDynamoDBRepository } from "../../adapters/secondary/repositories/user-repository";
import { User } from "../../entities/user";

export async function createUserUseCase(
  {
    name, password, email
  }: CreateUserUseCaseRequest,
  repository: UserDynamoDBRepository
): Promise<User> {
  const user = new User(name, email, password);
  await repository.create(user);
  return user;
}
export interface CreateUserUseCaseRequest {
  name: string;
  password: string;
  email: string;
}