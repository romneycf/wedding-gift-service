import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { name, email, password } = JSON.parse(event.body || "");

  const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  });

  const user = {
    PK: `USER#${email}`,
    name,
    email,
    password,
  };

  const params = new PutItemCommand({
    TableName: `Users-${process.env.STAGE}`,
    Item: marshall(user),
  });

  try {
    await client.send(params);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(user),
  };
};
