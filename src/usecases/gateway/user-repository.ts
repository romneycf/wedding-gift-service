import { User } from "../../entities/user";

export default interface UserRepository{
    create(user: User):Promise<void>
}