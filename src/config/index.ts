import dotenv from "dotenv";
import IConfig from "../interfaces/config.interface";

dotenv.config();

const config: IConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT || 5001,
  dbUri: process.env.DB_URL,
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refreshSecret",
    expiresIn: process.env.JWT_EXPIRES_IN || "6h",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};

export default config;
