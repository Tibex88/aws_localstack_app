import {
    aws_apigateway as apigw,
    CfnOutput,
    Stack,
    StackProps,
    aws_dynamodb as dynamodb,
    aws_lambda as lambda,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_s3 as s3
  } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "./api";

interface Note {
    noteId: string;
    createdAt: string;
    content: string;
    attachment: boolean;
  }

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

        // initialize s3 bucket
        const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
          bucketName: "app-frontend",
        });
        // initialize cloudfront
        const distribution = new cloudfront.Distribution(this, "WebsiteDistribution", {
          defaultRootObject: "index.html",
          defaultBehavior: {
            origin: new origins.S3StaticWebsiteOrigin(websiteBucket),
          },
          errorResponses: [
            {
              httpStatus: 403,
              responseHttpStatus: 200,
              responsePagePath: '/index.html',
            },
            {
              httpStatus: 404,
              responseHttpStatus: 200,
              responsePagePath: '/index.html',
            },
          ],
        });
    
        new CfnOutput(this, "GatewayUrl", { value: api.url });
        new CfnOutput(this, "Region", { value: this.region });
        new CfnOutput(this, "FrontendDistributionId", { value: distribution.distributionId });
    }
}