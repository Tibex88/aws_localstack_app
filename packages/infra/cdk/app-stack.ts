import {
    aws_apigateway as apigw,
    CfnOutput,
    Stack,
    StackProps,
    aws_dynamodb as dynamodb, aws_lambda as lambda
  } from "aws-cdk-lib";
import { Lambda } from "aws-cdk-lib/aws-ses-actions";
import { Construct } from "constructs";
import { Api } from "./api";

interface Note {
    noteId: string;
    createdAt: string;
    content: string;
    attachment: boolean;
  }

const dummyNotes: Note[] = [
    {
        noteId: "1",
        createdAt: "2023-01-01T12:00:00.000Z",
        content: "This is a dummy note.",
        attachment: false,
    },
    {
        noteId: "2",
        createdAt: "2023-01-02T12:00:00.000Z",
        content: "This is another dummy note.",
        attachment: true,
    },
    {
        noteId: "3",
        createdAt: "2023-01-03T12:00:00.000Z",
        content: "This is a third dummy note.",
        attachment: false,
    },
];

export class AwsSdkJsAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const table = new dynamodb.Table(this, "notes", {
          partitionKey: { name: "noteId", type: dynamodb.AttributeType.STRING },
        });

        const api = new apigw.RestApi(this, "endpoint");
        const notes = api.root.addResource("notes");
        notes.addMethod(
            'GET',
            new apigw.LambdaIntegration(
              new Api(this, "listNotes", {
                table,
                grantActions: ["dynamodb:Scan"],
              }).handler
            )
          );

        notes.addMethod(
          "POST",
          new apigw.LambdaIntegration(
            new Api(this, "createNote", {
              table,
              grantActions: ["dynamodb:PutItem"],
            }).handler
          )
        );

      const note = notes.addResource("{id}");

        note.addMethod(
          "GET",
          new apigw.LambdaIntegration(
            new Api(this, "getNote", {
              table,
              grantActions: ["dynamodb:GetItem"],
            }).handler
          )
        );

        note.addMethod(
          "PUT",
          new apigw.LambdaIntegration(
            new Api(this, "updateNote", {
              table,
              grantActions: ["dynamodb:UpdateItem"],
            }).handler
          )
        );

        note.addMethod(
          "DELETE",
          new apigw.LambdaIntegration(
            new Api(this, "deleteNote", {
              table,
              grantActions: ["dynamodb:DeleteItem"],
            }).handler
          )
        );

        new CfnOutput(this, "GatewayUrl", { value: api.url });
        new CfnOutput(this, "Region", { value: this.region });
    }
}