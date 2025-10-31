import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

import { 
    ACRConfig, 
    acrStack
} from "../stacks/backend/acr";

import { SystemAssignedIdentityPricipalId } from "./backend";

const config = new pulumi.Config();
const acrConfigParams = config.requireObject("acr") as ACRConfig;

export const devAcr = new acrStack("dev-acr-stack", acrConfigParams);

const roleAssignment = new azure_native.authorization.RoleAssignment("acr-role-assignment", {
    principalId: SystemAssignedIdentityPricipalId,
    principalType: "ServicePrincipal",
    roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d", // AcrPull
    scope: devAcr.registryId,
});