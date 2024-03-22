"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    isDevelopment: process.env.NODE_ENV === "development",
    port: process.env.PORT || 5000,
    dbUri: process.env.DB_URL,
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
        refreshSecret: process.env.JWT_REFRESH_SECRET || "refreshSecret",
        expiresIn: process.env.JWT_EXPIRES_IN || "6h",
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    },
};
exports.default = config;
