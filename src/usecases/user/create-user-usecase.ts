//ESSE MANO VAI SER CHAMADO PELO ADAPTER PRIMARY FAZER O BERIMBOLO DE CRIAR O USUARIO
//ABSTRACAO PARA CRIAR UM USUARIO INDIFERENTE DE ONDE FOR EXECUTADO
//IMPORTANTE----- ELE NAO DEVE SABER NADA DO CARA QUE TA CHAMANDO ELE
import { User } from "../../entities/user";

export async function createUserUseCase(
  newUser: User,
  repository: any//?????
): Promise<User> {
  const user = User.validateUser(newUser);
  await repository.create(user);
  return user;
}
