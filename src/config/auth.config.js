import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const authConfig = {
  secret: process.env.JWT_SECRET || "secret",
  jwtExpiration: process.env.JWT_EXPIRATION || 86400, // 24 hours
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || 86400 * 7, // 7 days
};
