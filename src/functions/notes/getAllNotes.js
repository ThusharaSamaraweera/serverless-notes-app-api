import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.notesTableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      // todo : get userId from cognito
      ":userId": event.queryStringParameters.userId,
    },
  };
  try {
    const result = await dynamoDb.query(params);
    return result.Items;
  } catch (error) {
    throw new APIError(error.message);
  }

});
