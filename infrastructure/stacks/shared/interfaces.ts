// Common interfaces for Azure infrastructure (following your CRUD project's shared patterns)

export interface AzureResourceBase {
    resourceGroupName: string;
    location: string;
    tags?: { [key: string]: string };
}

export interface CommonTags {
    environment: string;
    project: string;
    tier?: string;
    managedBy?: string;
    owner?: string;
    [key: string]: string | undefined;
}

// Network related interfaces (reusable across stacks)
export interface SecurityRule {
    name: string;
    priority: number;
    direction: "Inbound" | "Outbound";
    access: "Allow" | "Deny";
    protocol: "Tcp" | "Udp" | "*";
    sourcePortRange: string;
    destinationPortRange: string;
    sourceAddressPrefix: string;
    destinationAddressPrefix: string;
}

export interface NetworkSecurityGroup {
    name: string;
    securityRules: SecurityRule[];
}

export interface SubnetConfiguration {
    name: string;
    addressPrefix: string;
    nsgName: string;
}

// Infrastructure outputs interface (for type-safe stack returns)
export interface InfrastructureOutputs {
    resourceGroupName: string;
    resourceGroupId: string;
    vnetId: string;
    subnetIds: { [subnetName: string]: string };
    nsgIds: { [nsgName: string]: string };
}

// SKU interfaces (reusable for different Azure services)
export interface StandardSku {
    name: string;
    tier: string;
    size?: string;
    capacity?: number;
}