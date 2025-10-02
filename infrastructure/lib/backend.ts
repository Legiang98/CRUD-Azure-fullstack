import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

import { 
    appServiceStack, 
    AppServiceConfig, 
    AppServicePlanConfig,
} from "../stacks/backend/appService";

const config = new pulumi.Config();

const appServiceConfigParams = config.requireObject("appServiceIac") as AppServiceConfig;
export const devAppService = new appServiceStack("appServiceIac", appServiceConfigParams);