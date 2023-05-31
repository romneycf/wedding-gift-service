import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { User } from "../../entities/user";

export default interface UserRepository {
    create(user: User): Promise<void>;
    list(): Promise<any>;//TODO
    delete(PK: string): Promise<void>;
}