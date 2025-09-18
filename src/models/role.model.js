// Role model
import { DataTypes } from "sequelize";
import { sequelize } from "../db/pool.js";
import { MODEL_MESSAGES } from "../constants/messages.js";

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Roles",
    timestamps: false,
  }
);

await Role.sync(); // Ensure the model is synced with the database
console.log(MODEL_MESSAGES.ROLE_MODEL_SYNCED);

export { Role };
