import {
    aws_apigateway as apigw,
    CfnOutput,
    Stack,
    StackProps,
    aws_dynamodb as dynamodb, aws_lambda as lambda
  } from "aws-cdk-lib";
import { Lambda } from "aws-cdk-lib/aws-ses-actions";
import { Construct } from "constructs";

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

    //     const api = new apigw.RestApi(this, "endpoint");
    //     const notes = api.root.addResource("notes");

    //     notes.addMethod('GET', 
    //     new apigw.MockIntegration(
    //     {
    //         integrationResponses: [{
    //             statusCode: "200",
    //             responseParameters: {
    //               "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    //               "method.response.header.Access-Control-Allow-Origin": "'*'",
    //               "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,POST,PUT,DELETE'"
    //             },
    //           }],
    //           passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
    //           requestTemplates: {
    //             "application/json": JSON.stringify({message: dummyNotes})
    //           }
    //         }), {
    //           methodResponses: [{
    //             statusCode: "200",
    //             responseParameters: {
    //               "method.response.header.Access-Control-Allow-Headers": true,
    //               "method.response.header.Access-Control-Allow-Origin": true,
    //               "method.response.header.Access-Control-Allow-Methods": true
    //             },
    //           }]        
    //         });

    //     notes.addMethod(
    //         "PUT",
    //         new apigw.LambdaIntegration(
    //             new lambda.Function(this, "handler", {
    //                 runtime: lambda.Runtime.NODEJS_18_X,
    //                 handler: "app.handler",
    //                 code: lambda.Code.fromAsset(`../backend/dist/createNote`),
    //                 environment: {
    //                   NOTES_TABLE_NAME: "note",
    //                 },
    //               })
    //         )
    //     )
    //     new CfnOutput(this, "GatewayUrl", { value: api.url });
    //     new CfnOutput(this, "Region", { value: this.region });
    
    }
}