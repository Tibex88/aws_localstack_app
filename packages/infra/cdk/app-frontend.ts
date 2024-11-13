import { App } from "aws-cdk-lib";
import { AwsSdkJsAppFrontendStack } from "./app-frontend-stack";

const app = new App();
new AwsSdkJsAppFrontendStack(app, "AwsSdkJsAppFrontendStack");