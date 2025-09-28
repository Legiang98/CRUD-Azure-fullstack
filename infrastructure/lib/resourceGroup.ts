import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

import { ResourceGroupConfig, resourceGroupStack } from "../stacks/shared/resourceGroup";

const config = new pulumi.Config();
const resourceGroupConfig = config.requireObject("resourceGroups") as Record<string, { location: string; name: string }>;
const devResourceGroup = resourceGroupConfig.dev;

// console.log("devresourcegroup", devresourcegroup);

const devRgConfig: ResourceGroupConfig = {
    resourceGroupName: devResourceGroup.name, 
    location: devResourceGroup.location,
    tags: {
        environment: config.get("environment") || "dev",
        project: config.get("project") || "my-project",
    },
};

export const devRg = new resourceGroupStack("devResourceGroup", devRgConfig);
