import { App } from "aws-cdk-lib";
import { AwsSdkJsAppStack } from "./app-stack";


const app = new App();
new AwsSdkJsAppStack(app, "AwsSdkJsAppStack-3",{});
