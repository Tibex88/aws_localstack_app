import { APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { success, failure } from "./libs/response";
import crypto from "crypto";

export const handler = async (event: APIGatewayEvent) => {
    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: process.env.NOTES_TABLE_NAME,
        Item: marshall({
          noteId: crypto.randomBytes(20).toString("hex"),
          content: data.content,
          createdAt: Date.now().toString(),
          ...(data.attachment && { attachment: data.attachment }),
        })
    }

    try {
        let client: DynamoDBClient;

        if (process.env.LOCALSTACK_HOSTNAME) {
            const localStackConfig = {
              endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}`,
              region: "us-east-1",
            };
            client = new DynamoDBClient(localStackConfig);
          } else {
            client = new DynamoDBClient({});
          }      

        await client.send(new PutItemCommand(params));
        return success(params.Item);

    } catch (error) {
        console.log(error)
        return failure({ status: false });
    }
    

}

