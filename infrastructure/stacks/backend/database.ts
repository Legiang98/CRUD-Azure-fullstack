import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export interface DatabaseConfig {
    resourceGroupName: string;
    location: string;
    serverName: string;
    administratorLogin: string;
    administratorLoginPassword: string;
    databaseName: string;
}

export class databaseStack extends pulumi.ComponentResource {
    public readonly sqlServerId: pulumi.Output<string>;
    // public readonly sqlDatabaseId: pulumi.Output<string>;

    constructor(
        name: string,
        config: DatabaseConfig,
        opts?: pulumi.ResourceOptions
    ) {
        super("pulumi:component:databaseStack", name, {}, opts);

        // Create SQL Server
        const sqlServer = new azure_native.sql.Server(
            config.ServerName,
            {
                resourceGroupName: config.resourceGroupName,
                location: config.location,
                serverName: config.serverName,
                administratorLogin: config.administratorLogin,
                administratorLoginPassword: config.administratorLoginPassword,
                // administrators: {
                //     azureADOnlyAuthentication: false,
                //     login: config.administratorLogin,
                //     principalType: azure_native.sql.PrincipalType.User,
                //     sid: "00000011-1111-2222-2222-123456789111", // Replace with actual SID
                //     tenantId: "00000011-1111-2222-2222-123456789111", // Replace with actual Tenant ID
                // },
            },
            // { parent: this }    
        );

        this.sqlServerId = sqlServer.id;
    }
}

