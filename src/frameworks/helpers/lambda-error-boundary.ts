import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
  Handler,
} from "aws-lambda";
import { ResponseBuilder } from "./response-builder";
import { DomainException } from "@domains/exceptions/domain-exception";

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
    } catch (e: any) {
      console.error(e);

      if (e instanceof DomainException) {
        if (e.expose) return ResponseBuilder.buildDomainException(e);
      }

      return ResponseBuilder.build(500, "Internal Server Error");
    }
  };
}
