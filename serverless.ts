import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "wedding-gift-service",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "${opt:stage, 'dev'}",
    environment: "${self:custom.environment.${self:provider.stage}}" as any,
  },
  functions: {
    createUser: {
      handler: "src/create-user.handler",
      events: [
        {
          http: {
            method: "post",
            path: "/users",
          },
        },
      ],
    },
    getUsers: {
      handler: "src/get-users.handler",
      events: [
        {
          http: {
            method: "get",
            path: "/users",
          },
        },
      ],
    },
    deleteUser: {
      handler: "src/delete-user.handler",
      events: [
        {
          http: {
            method: "delete",
            path: "/users",
          },
        },
      ],
    },
  },
  custom: {
    environment: {
      local: {
        STAGE: "local"
      },
      dev: {
        STAGE: "dev"
      },
      prod: {
        STAGE: "prod"
      }
    },
    tableName: "Users-${self:provider.stage}",
    esbuild: {
      bundle: true,
      minify: false,
      packager: "yarn",
    },
    localstack: {
      // Only use localstack for the local stage
      stages: ["local"],

      host: "http://localhost",
      edgePort: 4566,

      // Setup a docker volume for localstack to run code from to improve performance
      lambda: {
        mountCode: true,
      },
    },
  },
  resources: {
    Resources: {
      UsersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.tableName}",
          AttributeDefinitions: [
            {
              AttributeName: "PK",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "PK",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-localstack",
  ],
};

module.exports = serverlessConfiguration;
