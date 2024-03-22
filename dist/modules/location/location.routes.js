"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const queryFeatures_middleware_1 = __importDefault(require("../../middleware/queryFeatures.middleware"));
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const location_controller_1 = __importDefault(require("./location.controller"));
const location_validation_1 = __importDefault(require("./location.validation"));
const locationRoutes = express_1.default.Router();
locationRoutes.post("/create", (0, validateRequest_middleware_1.default)(location_validation_1.default.createReq), (0, authorization_middleware_1.default)(), location_controller_1.default.createLocation);
locationRoutes.get("/", (0, queryFeatures_middleware_1.default)("multiple"), location_controller_1.default.getLocations);
locationRoutes.get("/:id", (0, queryFeatures_middleware_1.default)("single"), location_controller_1.default.getSigleLocation);
locationRoutes.patch("/update/:id", (0, validateRequest_middleware_1.default)(location_validation_1.default.updateReq), (0, authorization_middleware_1.default)(), location_controller_1.default.updateLocation);
locationRoutes.delete("/delete/:id", (0, authorization_middleware_1.default)(), location_controller_1.default.deleteLocation);
exports.default = locationRoutes;
