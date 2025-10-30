import { DatabaseStack } from "../stacks/backend/database";
import { DatabaseConfig } from "../stacks/backend/database";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const databaseConfigParams = config.requireObject("database") as DatabaseConfig;
// console.log("Database Config Params:", JSON.stringify(databaseConfigParams, null, 2));


export const devDatabase = new DatabaseStack("dev-sql-database-stack", databaseConfigParams);

export const sqlDatabaseConnectionString = devDatabase.connectionString;