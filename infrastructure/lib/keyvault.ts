import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";
import { KeyVaultStack } from "../stacks/backend/keyvault";
import { KeyVaultConfig } from "../stacks/backend/keyvault";

import { sqlDatabaseConnectionString } from "./database";
import { SystemAssignedIdentityPricipalId } from "./backend";

const config = new pulumi.Config();
const kvConfig = config.requireObject("keyvault") as  KeyVaultConfig;
const devKeyVault = new KeyVaultStack("dev-keyvault-stack", kvConfig);
 
const roleAssigment = new azure_native.authorization.RoleAssignment("dev-keyvault-role-assignment", {
    principalId: "3cbd3578-8a69-4d73-b8d4-f2bce0c3dccf", //Me
    principalType: "User",
    roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/b86a8fe4-44ce-4948-aee5-eccb2c155cd7", // Key Vault Secrets User
    scope: devKeyVault.vaultId,
});

const appServiceRoleAssignment = new azure_native.authorization.RoleAssignment("dev-appservice-keyvault-role-assignment", {
    principalId: SystemAssignedIdentityPricipalId,
    principalType: "ServicePrincipal",
    roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/b86a8fe4-44ce-4948-aee5-eccb2c155cd7", // Key Vault Secrets User
    scope: devKeyVault.vaultId,
});

interface SecretsConfig {
    // 'DevDatabase-ConnectionString': pulumi.Input<string> | undefined;
}

const secrets: { [key: string]: pulumi.Input<string> | undefined } = {
    'DevDatabase-ConnectionString': pulumi.secret(sqlDatabaseConnectionString),
};

const secretResources: { [key: string]: azure_native.keyvault.Secret } = {};

Object.keys(secrets).forEach(secretName => {
    secretResources[secretName] = new azure_native.keyvault.Secret(`dev-kv-${secretName}`, {
        resourceGroupName: 'iac-dev-rg',
        properties: {
            attributes: {
                enabled: true
            },
            value: secrets[secretName],
        },
        secretName: secretName,
        vaultName: devKeyVault.name,
        tags: {
            "file-encoding": "utf-8",
        },
    }, {
        dependsOn: [devKeyVault]
    });
});
