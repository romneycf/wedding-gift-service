import UserRepository from "../gateway/user-repository";

export async function deleteUserUseCase(
  { PK }: DeleteUserUseCaseRequest,
  repository: UserRepository
): Promise<any> {
  //??????
  const response = await repository.delete(PK);
  return response;
}
export interface DeleteUserUseCaseRequest {
  PK: string;
}
