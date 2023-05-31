import { DeleteItemCommand, DeleteItemCommandOutput, PutItemCommand, ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamodbClient } from "../../../client";
import { User } from "../../../entities/user";

export class UserDynamoDBRepository {
  tableName: string = `Users-${process.env.STAGE}`

  async create(user: User): Promise<void> {
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
  //TODO: Trocar retorno para lista de usuários
  async scan(): Promise<ScanCommandOutput> {
    const params = new ScanCommand({
      TableName: this.tableName
    });

    try {
      return await dynamodbClient.send(params);
    } catch (e) {
      console.error('UserRepository scan()')
      throw e
    }
  }
  //TODO: Trocar retorno promise<void>
  async delete(key: string): Promise<DeleteItemCommandOutput> {
    const params = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({
        "PK": key
      }),
    });

    try {
      return await dynamodbClient.send(params);
    } catch (e) {
      console.error('UserRepository delete()')
      throw e
    }
  }
  //TODO: Trocar retorno promise<void>
  async getUser(email: string, password: string): Promise<ScanCommandOutput> {
    //TODO: Trocar para getitemComand
    const params = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: "email= :email and password= :password",
      ExpressionAttributeValues: {
        ":email": { "S": email },
        ":password": { "S": password }
      }
    });

    try {
      return await dynamodbClient.send(params);
    } catch (e) {
      console.error('UserRepository getUser()')
      throw e
    }
  }
}