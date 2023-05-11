import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  });

  const params = new ScanCommand({
    TableName: `Users-${process.env.STAGE}`,
  });

  const response = await client.send(params);

  const users = response.Items?.map((item) => unmarshall(item));

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
