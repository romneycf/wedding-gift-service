import { User } from "../../entities/user";

export default interface UserRepository {
  create(user: User): Promise<void>;
  list(): Promise<User[]>;
  delete(PK: string): Promise<User | undefined>;
}
