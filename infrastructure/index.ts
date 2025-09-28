import * as pulumi from "@pulumi/pulumi";
import { networkResources, vnetId, vnetName, resourceGroupName, appSubnetId, dbSubnetId, lbSubnetId } from "./networking/network";

// Export network outputs
export const fullstackVnetId = vnetId;
export const fullstackVnetName = vnetName;
export const fullstackResourceGroupName = resourceGroupName;
export const applicationSubnetId = appSubnetId;
export const databaseSubnetId = dbSubnetId;
export const loadBalancerSubnetId = lbSubnetId;

// Export network configuration for other modules
export { networkResources };
