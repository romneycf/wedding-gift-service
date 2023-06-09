import {
  DeleteItemCommand,
  PutItemCommand,
  ScanCommand,
  ScanCommandOutput
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { User } from "../../../domains/entities/user";
import UserRepository from "../../../domains/usecases/gateway/user-repository";
import { dynamodbClient } from "../../../frameworks/aws/clients/dynamodb-client";

export class UserDynamoDBRepository implements UserRepository {
  tableName: string = `Users-${process.env.STAGE}`;

  async create(user: User): Promise<void> {
    const params = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall({
        PK: user.PK,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    try {
      await dynamodbClient.send(params);
    } catch (e) {
      console.error("UserRepository create()");
      throw e;
    }
  }
  //TODO: Trocar retorno para lista de usu�rios
  async list(): Promise<User[]> {
    const params = new ScanCommand({
      TableName: this.tableName,
    });

    try {
      const response = await dynamodbClient.send(params);
      const userRecords = response.Items?.map((item) => unmarshall(item)) || [];

      const users = userRecords.map((user) => {
        return new User(user.name, user.email, user.password);
      });

      return users;
    } catch (e) {
      console.error("UserRepository scan()");
      throw e;
    }
  }
  //TODO: Trocar retorno promise<void>
  async delete(key: string): Promise<User | undefined> {
    //TODO:
    const params = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({
        PK: key,
      }),
      ReturnValues: "ALL_OLD",
    });
    try {
      const response = await dynamodbClient.send(params);
      if (response.Attributes === undefined) return undefined;

      const record = unmarshall(response.Attributes);

      return new User(record.name, record.email, record.password);
    } catch (e) {
      console.error("UserRepository delete()");
      throw e;
    }
  }
  //TODO: Trocar retorno promise<void>
  async getUser(email: string, password: string): Promise<ScanCommandOutput> {
    //TODO: Trocar para getitemComand
    const params = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: "email= :email and password= :password",
      ExpressionAttributeValues: {
        ":email": { S: email },
        ":password": { S: password },
      },
    });

    try {
      return await dynamodbClient.send(params);
    } catch (e) {
      console.error("UserRepository getUser()");
      throw e;
    }
  }
}
