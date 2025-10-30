import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

import { 
    ACRConfig, 
    acrStack
} from "../stacks/backend/acr";

const config = new pulumi.Config();
const acrConfigParams = config.requireObject("acr") as ACRConfig;

export const devAcr = new acrStack("dev-acr-stack", acrConfigParams);