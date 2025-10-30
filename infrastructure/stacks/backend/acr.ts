import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export interface ACRConfig {
    registryName: string;
    resourceGroupName: string;
    location: string;
    sku: string;
    adminUserEnabled?: boolean;
    tags?: { [key: string]: string };
}

export class acrStack extends pulumi.ComponentResource {
    public readonly registryId: pulumi.Output<string>;
    public readonly registryLoginServer: pulumi.Output<string>;

    constructor(name: string, config: ACRConfig, opts?: pulumi.ResourceOptions) {
        super("pulumi:component:acrStack", name, {}, opts);

        const acr = new azure_native.containerregistry.Registry(config.registryName, {
            resourceGroupName: config.resourceGroupName,
            registryName: config.registryName,
            location: config.location,
            sku: { name: config.sku },
            adminUserEnabled: config.adminUserEnabled ?? true, 
            publicNetworkAccess: "Enabled",
            tags: config.tags,
        });

        this.registryId = acr.id;
        this.registryLoginServer = acr.loginServer;

        this.registerOutputs({
            registryId: this.registryId,
            registryLoginServer: this.registryLoginServer,
        });
    }
}
