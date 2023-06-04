import { User } from "@domains/entities/user";
import UserRepository from "../gateway/user-repository";

export async function deleteUserUseCase(
  { PK }: DeleteUserUseCaseRequest,
  repository: UserRepository
): Promise<User | undefined> {
  const response = await repository.delete(PK);
  return response;
}
export interface DeleteUserUseCaseRequest {
  PK: string;
}
