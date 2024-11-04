
// import {appApi} from 

import {
    aws_apigateway as apigw,
    CfnOutput,
    Stack,
    StackProps
  } from "aws-cdk-lib";
import { Construct } from "constructs";
export class AwsSdkJsAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        const api = new apigw.RestApi(this, "endpoint");
        const notes = api.root.addResource("notes");

        notes.addMethod('GET', 
            new apigw.MockIntegration({
            integrationResponses: [{
            statusCode: "200",
            responseTemplates: {
                'application/json': JSON.stringify({ message: 'Hello from API Gateway!' })
            },
            }],
            requestTemplates: {
            'application/json': '{"statusCode": 200}'
            },
        }), {
            methodResponses: [{
            statusCode: "200",
            responseModels: {
                'application/json': apigw.Model.EMPTY_MODEL
            }
            }]
        });

        new CfnOutput(this, "GatewayUrl", { value: api.url });
        new CfnOutput(this, "Region", { value: this.region });
    
    }
}