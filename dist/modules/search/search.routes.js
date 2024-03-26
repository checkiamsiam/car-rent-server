"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryFeatures_middleware_1 = __importDefault(require("../../middleware/queryFeatures.middleware"));
const search_contoller_1 = __importDefault(require("./search.contoller"));
const searchRoutes = express_1.default.Router();
searchRoutes.get("/:id", (0, queryFeatures_middleware_1.default)("multiple"), search_contoller_1.default.searchCarByLocation);
exports.default = searchRoutes;
