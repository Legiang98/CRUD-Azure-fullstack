import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

export interface ResourceGroupConfig {
    resourceGroupName: string;
    location: string;
    tags?: { [key: string]: string };
}

export class resourceGroupStack extends pulumi.ComponentResource {
    public readonly name: pulumi.Output<string>
    public readonly location: pulumi.Output<string>;
    public readonly id: pulumi.Output<string>;

    constructor(name: string, config: ResourceGroupConfig, opts?: pulumi.ResourceOptions) {
        super("custom:stack:resourceGroupStack", name, {}, opts);   
        const rg = new azure.resources.ResourceGroup(
            config.resourceGroupName,
            {
                resourceGroupName: config.resourceGroupName,
                location: config.location,
                tags: config.tags,
            },
            { parent: this }
        );

        this.name = rg.name;
        this.location = rg.location;
        this.id = rg.id;

        this.registerOutputs({
            name: this.name,
            location: this.location,
            id: this.id,
        });
    }
}
