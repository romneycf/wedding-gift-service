import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
  Handler,
} from "aws-lambda";
import { ResponseBuilder } from "./response-builder";

export function lambdaErrorBoundary(
  handler: (
    event: APIGatewayProxyEvent,
    context: Context
  ) => Promise<APIGatewayProxyResult>
) {
  return async function (
    event: any,
    context: any
  ): Promise<APIGatewayProxyResult> {
    try {
      return await handler(event, context);
    } catch (e) {
      console.error(e);
      return ResponseBuilder.build(500, "Internal Server Error");
    }
  };
}
