// User model
import { sequelize } from "../db/pool.js";
import bcrypt from "bcryptjs";
import { Sequelize, DataTypes } from "sequelize";
// import { MODEL_MESSAGES } from "../constants/messages.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

await User.sync({ force : true }); 