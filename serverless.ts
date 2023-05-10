import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "wedding-gift-service",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
  },
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "post",
            path: "hello",
          },
        },
      ],
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      packager: "yarn",
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
};

module.exports = serverlessConfiguration;
