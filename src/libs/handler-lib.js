import { logger } from "../utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
} from "./responseGenerators";

export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;

    try {
      // Run the Lambda
      const result = await lambda(event, context);
      body = createSuccessResponse(result);
      statusCode = 200;
    } catch (e) {
      logger.error("Server Error - " + e.message);
      body = createErrorResponse(e.message, e.description);
      statusCode = e.httpCode || 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
