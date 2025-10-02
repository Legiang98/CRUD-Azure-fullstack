// Sequelize database connection setup
import { dbConfig } from "../config/db.config.js";
import { Sequelize } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.server,
    port: dbConfig.dbPort,
    dialect: "mssql",
    dialectOptions: dbConfig.options || {},
    logging: false, // Set to true to see SQL logs
  }
);

// Test connection
// try {
//   await sequelize.authenticate();
//   console.log("Database connection established.");
//   const [result] = await sequelize.query("SELECT 1 AS number");
//   console.log(result[0]);
// } catch (err) {
//   console.error("Database Connection Failed! Bad Config: ", err);

export { sequelize };
