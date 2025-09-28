import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

import { 
    AzureResourceBase, 
    SecurityRule, 
    NetworkSecurityGroup, 
    SubnetConfiguration 
} from "./interfaces";

export interface NetworkConfig extends AzureResourceBase {
    name: string;
    addressSpace: string[];
    nsgs: NetworkSecurityGroup[];
    subnets: SubnetConfiguration[];
}

export class networkStack extends pulumi.ComponentResource {
    public readonly virtualNetworkId: pulumi.Output<string>;
    public readonly virtualNetworkName: pulumi.Output<string>;
    public readonly nsgIds: { [nsgName: string]: pulumi.Output<string> };
    public readonly subnetIds: { [subnetName: string]: pulumi.Output<string> };

    constructor(
        name: string, 
        config: NetworkConfig, 
        opts?: pulumi.ResourceOptions
    ) {
        super("custom:stack:networkStack", name, {}, opts);

        const virtualNetwork = new azure_native.network.VirtualNetwork(
            `${name}`,
            {
                resourceGroupName: config.resourceGroupName,
                location: config.location,
                addressSpace: {
                    addressPrefixes: config.addressSpace
                },
                virtualNetworkName: config.name
            },
            { parent: this }
        );

        const nsgs: { [key: string]: azure_native.network.NetworkSecurityGroup } = {};
        config.nsgs.forEach((nsgConfig) => {
            // ADD this for debugging
            // console.log("Processing NSG Config:", nsgConfig.name);
            // console.log("Security Rules:", nsgConfig.securityRules);

            nsgs[nsgConfig.name] = new azure_native.network.NetworkSecurityGroup(
                `${name}-${nsgConfig.name}`,
                {
                    resourceGroupName: config.resourceGroupName,
                    location: config.location,
                    networkSecurityGroupName: nsgConfig.name,
                    securityRules: nsgConfig.securityRules  
                },
                { parent: this }
            );
        });

        const subnets: { [key: string]: azure_native.network.Subnet } = {};
        config.subnets.forEach((subnetConfig) => {
            subnets[subnetConfig.name] = new azure_native.network.Subnet(
                `${name}-${subnetConfig.name}`,
                {
                    resourceGroupName: config.resourceGroupName,
                    virtualNetworkName: virtualNetwork.name,
                    subnetName: subnetConfig.name,
                    addressPrefix: subnetConfig.addressPrefix,
                    networkSecurityGroup: {
                        id: nsgs[subnetConfig.nsgName].id
                    }
                },
                { parent: this }
            );
        });

        this.virtualNetworkId = virtualNetwork.id;
        this.virtualNetworkName = virtualNetwork.name;
        this.nsgIds = {};
        config.nsgs.forEach((nsgConfig) => {
            this.nsgIds[nsgConfig.name] = nsgs[nsgConfig.name].id;
        });
        this.subnetIds = {};
        config.subnets.forEach((subnetConfig) => {
            this.subnetIds[subnetConfig.name] = subnets[subnetConfig.name].id;
        });

        this.registerOutputs({
            virtualNetworkId: this.virtualNetworkId,
            virtualNetworkName: this.virtualNetworkName,
            nsgIds: this.nsgIds,
            subnetIds: this.subnetIds,
        });
    }
}