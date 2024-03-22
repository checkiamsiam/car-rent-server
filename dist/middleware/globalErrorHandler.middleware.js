"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const sendResponse_util_1 = __importDefault(require("../utils/sendResponse.util"));
// handel cast error db
const handelCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new customError_util_1.default(message, http_status_1.default.BAD_REQUEST);
};
// handel duplicate error
const handelDuplicateErrorDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value.trim()}. Please use another value!`.replace(/['"]+/g, "");
    return new customError_util_1.default(message, http_status_1.default.BAD_REQUEST);
};
// handel validation ( mongoose + zod ) error
const handelValidationErrorDB = (err) => {
    try {
        const errors = Object.values(err.errors).map((el) => el.message);
        const message = `Invalid input data. ${errors.join(". ")}`;
        return new customError_util_1.default(message, http_status_1.default.BAD_REQUEST);
    }
    catch (error) {
        return new customError_util_1.default(err.message, 400);
    }
};
const sendErrorProd = (err, res) => {
    if (!err.isOperational) {
        (0, sendResponse_util_1.default)(res, {
            statusCode: err.statusCode,
            success: false,
            message: "Something went wrong",
        });
    }
    else {
        console.error("Error 💥" + err);
        // 2. Send generic message to client
        (0, sendResponse_util_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Something went wrong",
            error: {
                message: err.message,
            },
        });
    }
};
// send errorDevelopment to client
const sendErrorDev = (err, res) => {
    (0, sendResponse_util_1.default)(res, {
        statusCode: err.statusCode,
        success: false,
        error: {
            message: err.message,
            stack: err.stack,
        },
    });
};
// globalErrorHandler
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";
    if (err.name === "CastError") {
        err = handelCastErrorDB(err);
    }
    if (err.code === 11000) {
        err = handelDuplicateErrorDB(err);
    }
    if (err.name === "ValidationError" || err.name === "ZodError") {
        err = handelValidationErrorDB(err);
    }
    if (err.name === "JsonWebTokenError") {
        err = new customError_util_1.default("Invalid token. Please log in again!", http_status_1.default.UNAUTHORIZED);
    }
    if (err.name === "TokenExpiredError") {
        err = new customError_util_1.default("Token expired. Please log in again!", http_status_1.default.UNAUTHORIZED);
    }
    if (config_1.default.isDevelopment) {
        sendErrorDev(err, res);
    }
    else {
        sendErrorProd(err, res);
    }
};
exports.default = globalErrorHandler;
