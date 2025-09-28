import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

import { ResourceGroupConfig, resourceGroupStack } from "../stacks/shared/resourceGroup";

const config = new pulumi.Config();
const devResourceGroup = config.requireObject("resourceGroups") as { name: string; location: string };

const devRgConfig: ResourceGroupConfig = {
    resourceGroupName: devResourceGroup.name, 
    location: devResourceGroup.location,
    tags: {
        managedBy: "Pulumi",
        project: "fullstack-crud",
        environment: "dev",
    },
};

export const devRg = new resourceGroupStack("devResourceGroup", devRgConfig);
