export { devRg, resourceGroupName, resourceGroupId, resourceGroupLocation } from "./lib/resourceGroup";
export { 
    devNetwork as devVNet, 
    nsgIds as devNSGs, 
    subnetIds as devSubnets, 
    vnetId, 
    vnetName,
    backendSubnetId,
    frontendSubnetId, 
    databaseSubnetId,
    backendNSGId,
    frontendNSGId,
    databaseNSGId
} from "./lib/network";