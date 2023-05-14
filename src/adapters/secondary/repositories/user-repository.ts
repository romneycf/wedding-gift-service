import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { User } from "../../../entities/user";
import { dynamodbClient } from "../../../client";

export class UserRepository {
  tableName: string = `Users-${process.env.STAGE}`

  async create(user: User):Promise<void> {
    const params = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall({
        PK: user.PK,
        name: user.name,
        email: user.email,
        password: user.password
      }),
    });
    try {
      await dynamodbClient.send(params);
    } catch (e) {
      console.error('UserRepository create()')
      throw e 
    }
    
  }
  
}