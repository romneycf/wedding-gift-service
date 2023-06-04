import { APIGatewayProxyResult } from "aws-lambda";

export class ResponseBuilder {
  public static build(
    statusCode: number,
    body?: any
  ): APIGatewayProxyResult {
    let response: any = {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (body) {
      response.body = JSON.stringify(body);
    }

    return response;
  }
}
