"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const jwt_helper_1 = require("../../helpers/jwt.helper");
const customError_util_1 = __importDefault(require("../../utils/customError.util"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new customError_util_1.default("User does not exist", http_status_1.default.NOT_FOUND);
    }
    if (isUserExist.password && !(yield isUserExist.comparePassword(password))) {
        throw new customError_util_1.default("Password is incorrect", http_status_1.default.UNAUTHORIZED);
    }
    //create access token & refresh token
    const { email: userEmail, id } = isUserExist;
    const accessToken = jwt_helper_1.jwtHelpers.createToken({ id, email: userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return {
        accessToken,
        user: {
            id,
            email: userEmail,
        },
    };
});
exports.authService = {
    loginUser,
};
