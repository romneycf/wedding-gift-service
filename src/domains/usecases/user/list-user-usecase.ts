import { User } from "@domains/entities/user";
import UserRepository from "../gateway/user-repository";

export function listUserUseCase(repository: UserRepository): Promise<User[]> {
  return repository.list();
}
