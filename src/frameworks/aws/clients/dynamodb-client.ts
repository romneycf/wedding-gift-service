import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const config: DynamoDBClientConfig = {
  region: "us-east-1",
};

if (process.env.STAGE === "local") {
  config.endpoint = `http://${process.env.LOCALSTACK_HOSTNAME}:4566`;
}

export const dynamodbClient = new DynamoDBClient(config);
