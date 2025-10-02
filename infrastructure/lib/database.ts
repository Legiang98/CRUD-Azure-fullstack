import { databaseStack } from "../stacks/backend/database";
import { DatabaseConfig } from "../stacks/backend/database";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const databaseConfigParams = config.requireObject("database") as DatabaseConfig;

export const devDatabase = new databaseStack("dev-sql-database-stack", databaseConfigParams);
