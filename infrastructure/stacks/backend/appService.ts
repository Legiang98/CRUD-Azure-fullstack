import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export interface AppServicePlanConfig {
    appServicePlanName: string;
    kind: string;
    sku: {
        name: string;
        tier: string;
        family: string;
        size: string;
        capacity: number;
    };
    reserved?: boolean;
    targetWorkerCount?: number;
    targetWorkerSizeId?: number;
}

export interface AppServiceConfig {
    appServiceName: string;
    kind: string;
    resourceGroupName: string;
    location: string;
    appServicePlanName: string;
    appServicePlanConfig: AppServicePlanConfig;
    appSettings?: { [key: string]: string };
    SiteConfig?: { [key: string]: any };
    httpsOnly?: boolean;
    clientAffinityEnabled?: boolean;
    tags?: { [key: string]: string };
}

export class appServiceStack extends pulumi.ComponentResource {
    public readonly appServicePlanId: pulumi.Output<string>;
    public readonly appServiceId: pulumi.Output<string>;
    public readonly appServiceName: pulumi.Output<string>;
    public readonly defaultHostName: pulumi.Output<string>;
    public readonly SystemAssignedIdentityPricipalId: pulumi.Output<string>;

    constructor(
        name: string,
        config: AppServiceConfig,
        opts?: pulumi.ResourceOptions
    ) {
        super("pulumi:component:appServiceStack", name, {}, opts);

        const appServicePlan = new azure_native.web.AppServicePlan(
            `${config.appServicePlanName}`,
            {
                resourceGroupName: config.resourceGroupName,
                kind: config.appServicePlanConfig.kind,
                location: config.location,
                name: config.appServicePlanName,
                sku: config.appServicePlanConfig.sku,
                reserved: config.appServicePlanConfig.reserved ?? true,
                tags: config.tags,
                targetWorkerCount: config.appServicePlanConfig.targetWorkerCount,
                targetWorkerSizeId: config.appServicePlanConfig.targetWorkerSizeId
            },
            // { parent: this }
        );

        const appService = new azure_native.web.WebApp(
            `${config.appServiceName}`,
            {
                resourceGroupName: config.resourceGroupName,
                kind: config.kind,
                location: config.location,
                serverFarmId: appServicePlan.id,
                siteConfig: config.SiteConfig,
                // appSettings: config.appSettings,
                httpsOnly: config.httpsOnly ?? true,
                clientAffinityEnabled: config.clientAffinityEnabled ?? false,
                identity: {
                    type: azure_native.web.ManagedServiceIdentityType.SystemAssigned,
                },
                tags: config.tags,
                name: config.appServiceName,
            },
            {
                dependsOn: [appServicePlan],
            }
        );

        this.appServicePlanId = appServicePlan.id;
        this.appServiceId = appService.id;
        this.appServiceName = appService.name;
        this.defaultHostName = appService.defaultHostName;
        this.SystemAssignedIdentityPricipalId = appService.identity.apply(id => id?.principalId!);

        this.registerOutputs({
            appServicePlanId: this.appServicePlanId,
            appServiceId: this.appServiceId,
            appServiceName: this.appServiceName,
            defaultHostName: this.defaultHostName,
            SystemAssignedIdentityPricipalId: this.SystemAssignedIdentityPricipalId,
        });
    }
}