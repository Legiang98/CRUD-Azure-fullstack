import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import { resourceGroup } from "../shared/resourceGroup";

interface SubnetConfig {
    name: string;
    addressPrefix: string;
    nsgName: string;
    nsgRules: azure.network.SecurityRuleArgs[];
}

interface NetworkConfig {
    virtualNetworkName: string;
    location: string;
    vnetAddressSpace: string[];
    subnetConfigs: SubnetConfig[];
}

export class networkStack extends pulumi.ComponentResource {
    public readonly virtualNetworkId: pulumi.Output<string>;
    public readonly nsgIds: { [subnetName: string]: pulumi.Output<string> };
    public readonly subnetIds: { [subnetName: string]: pulumi.Output<string> };

    constructor(name: string, config: NetworkConfig, opts?: pulumi.ResourceOptions) {
        super("custom:stack:networkStack", name, {}, opts);

        const virtualNetwork = new azure.network.VirtualNetwork(
            config.virtualNetworkName,
            {
                resourceGroupName: resourceGroup.name,
                location: config.location,
                addressSpace: { addressPrefixes: config.vnetAddressSpace },
            },
            { parent: this }
        );

        const nsgs: { [key: string]: azure.network.NetworkSecurityGroup } = {};
        const subnets: { [key: string]: azure.network.Subnet } = {};
        
        config.subnetConfigs.forEach((subnetConfig) => {
            nsgs[subnetConfig.name] = new azure.network.NetworkSecurityGroup(
                `${subnetConfig.nsgName}`,
                {
                    networkSecurityGroupName: subnetConfig.nsgName,
                    resourceGroupName: resourceGroup.name,
                    location: config.location,
                    securityRules: subnetConfig.nsgRules,
                },
                { parent: this }
            );
        });

        config.subnetConfigs.forEach((subnetConfig) => {
            subnets[subnetConfig.name] = new azure.network.Subnet(
                `${subnetConfig.name}`,
                {
                    subnetName: subnetConfig.name,
                    resourceGroupName: resourceGroup.name,
                    virtualNetworkName: virtualNetwork.name,
                    addressPrefix: subnetConfig.addressPrefix,
                    networkSecurityGroup: {
                        id: nsgs[subnetConfig.name].id
                    }
                },
                { parent: this }
            );
        });

        // Collect NSG IDs and Subnet IDs for output
        this.nsgIds = {};
        this.subnetIds = {};
        config.subnetConfigs.forEach((subnetConfig) => {
            this.nsgIds[subnetConfig.name] = nsgs[subnetConfig.name].id;
            this.subnetIds[subnetConfig.name] = subnets[subnetConfig.name].id;
        });

        this.virtualNetworkId = virtualNetwork.id;

        this.registerOutputs({
            virtualNetworkId: this.virtualNetworkId,
            nsgIds: this.nsgIds,
            subnetIds: this.subnetIds,
        });
    }
}