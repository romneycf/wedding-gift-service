import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("teste");
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "Some update",
      },
      null,
      2
    ),
  };
};
