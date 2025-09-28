import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

import { NetworkConfig, networkStack } from "../stacks/shared/network";
import { devRg } from "./resourceGroup";

const config = new pulumi.Config();
const virtualNetworkConfig = config.requireObject("virtualNetworks") as NetworkConfig;
// console.log("virtualNetworkConfig:", virtualNetworkConfig);

export const devNetwork = new networkStack(
    "devNetwork", 
    virtualNetworkConfig
);

// // Export network components (following your centralized exports pattern)
// export const devVNet = devNetwork;
// export const vnetId = devNetwork.virtualNetworkId;
// export const vnetName = devNetwork.virtualNetworkName;
// export const nsgIds = devNetwork.nsgIds;
// export const subnetIds = devNetwork.subnetIds;
// export const backendSubnetId = devNetwork.subnetIds["iac-dev-backend-subnet"];
// export const frontendSubnetId = devNetwork.subnetIds["iac-dev-frontend-subnet"];
// export const databaseSubnetId = devNetwork.subnetIds["iac-dev-database-subnet"];
// export const backendNSGId = devNetwork.nsgIds["iac-dev-backend-nsg"];
// export const frontendNSGId = devNetwork.nsgIds["iac-dev-frontend-nsg"];
// export const databaseNSGId = devNetwork.nsgIds["iac-dev-database-nsg"];
