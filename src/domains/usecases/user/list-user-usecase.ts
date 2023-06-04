import UserRepository from "../gateway/user-repository";

export async function listUserUseCase(
  repository: UserRepository
): Promise<any> {//TODO
  return await repository.list();
}