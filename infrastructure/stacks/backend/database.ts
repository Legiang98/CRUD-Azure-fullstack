import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export interface DatabaseSKU {
    name: string;
    tier: string;
}

export interface DatabaseConfig {
    resourceGroupName: string;
    location: string;
    serverName: string;
    administratorLogin: string;
    administratorLoginPassword: string;
    databaseName: string;
    sku?: DatabaseSKU;
    maxSizeBytes?: number;
}

export class DatabaseStack extends pulumi.ComponentResource {
    public readonly sqlServerId: pulumi.Output<string>;
    public readonly sqlDatabaseId: pulumi.Output<string>;
    public readonly connectionString: pulumi.Output<string>;

    constructor(
        name: string,
        config: DatabaseConfig,
        opts?: pulumi.ResourceOptions
    ) {
        super("pulumi:component:DatabaseStack", name, {}, opts);

        // Create SQL Server
        const sqlServer = new azure_native.sql.Server(
            config.serverName,
            {
                resourceGroupName: config.resourceGroupName,
                location: config.location,
                serverName: config.serverName,
                administratorLogin: config.administratorLogin,
                administratorLoginPassword: config.administratorLoginPassword,
            },
            { parent: this }
        );

        const sqlDatabase = new azure_native.sql.Database(
            `${config.databaseName}`,
            {
                resourceGroupName: config.resourceGroupName,
                location: config.location,
                serverName: sqlServer.name,
                databaseName: config.databaseName,
                sku: config.sku ? {
                    name: config.sku.name,
                    tier: config.sku.tier
                } : undefined,
                maxSizeBytes: config.maxSizeBytes,
            },
            { 
                parent: this,
                dependsOn: [sqlServer]
            }
        );

        this.sqlServerId = sqlServer.id;
        this.sqlDatabaseId = sqlDatabase.id;
        this.connectionString = pulumi.interpolate`Server=tcp:${sqlServer.name}.database.windows.net,1433;Initial Catalog=${sqlDatabase.name};Persist Security Info=False;User ID=${config.administratorLogin};Password=${config.administratorLoginPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`;
    }
}