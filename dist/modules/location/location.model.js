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
exports.Location = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const customError_util_1 = __importDefault(require("../../utils/customError.util"));
const locationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cars: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "cars",
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
locationSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.Location.findOne({
            name: this.name,
        });
        if (isExist) {
            throw new customError_util_1.default("Already exist !", http_status_1.default.CONFLICT);
        }
        next();
    });
});
// modal should define at last
exports.Location = (0, mongoose_1.model)("location", locationSchema);
