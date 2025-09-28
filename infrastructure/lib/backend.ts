import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

// Import interfaces and class from the stack (following your CRUD project's centralized imports)
import { 
    appServiceStack, 
    AppServiceConfig, 
    AppServicePlanConfig,
} from "../stacks/backend/appService";
import { devRg } from "./resourceGroup";

const config = new pulumi.Config();

const appServiceConfigParams = config.requireObject("appServiceIac") as AppServiceConfig;
export const devAppService = new appServiceStack("appServiceIac", appServiceConfigParams);

// const appServiceContainer = new azure_native.web.WebAppSiteContainer("webAppSiteContainerResource", {
//     name: "test-container",
//     isMain: false,
//     resourceGroupName: "Fullstack",
//     image: "mcr.microsoft.com/appsvc/staticsite:latest",
//     userName: "giang",
//     kind: "app,linux,container",
//     environmentVariables: [{
//         name: "NODE_ENV",
//         value: "development",
//     }],
//     // authType: azure_native.web.AuthType.Anonymous,
//     // containerName: "test-container",
// });