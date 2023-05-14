import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: process.env.STAGE === 'local' ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : undefined,
})