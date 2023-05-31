import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { User } from "../../entities/user";

export default interface UserRepository {
    create(user: User): Promise<void>;
    scan(): Promise<ScanCommandOutput>;
    delete(PK: string): Promise<void>;
}