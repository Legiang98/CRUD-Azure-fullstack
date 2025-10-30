import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export interface KeyVaultConfig {
    resourceGroupName: string;
    location: string;
    vaultName: string;
    tenantId: string;
}

export class KeyVaultStack extends pulumi.ComponentResource {
    public readonly vaultId: pulumi.Output<string>;
    public readonly vaultUri: pulumi.Output<string>;
    public readonly name: pulumi.Output<string>;

    constructor(name: string, config: KeyVaultConfig, opts?: pulumi.ResourceOptions) {
        super("pulumi:component:KeyVaultStack", name, {}, opts);

        const vault = new azure_native.keyvault.Vault(config.vaultName, {
            resourceGroupName: config.resourceGroupName,
            location: config.location,
            properties: {
                tenantId: config.tenantId,
                sku: { name: "standard", family: "A" },
                accessPolicies: [],
                enableRbacAuthorization: true,
            },
        }, { parent: this });

        this.vaultId = vault.id;
        this.vaultUri = vault.properties.apply(p => p?.vaultUri || "");
        this.name = vault.name;

        this.registerOutputs({
            vaultId: this.vaultId,
            vaultUri: this.vaultUri,
            name: this.name,
        });
    }
}
