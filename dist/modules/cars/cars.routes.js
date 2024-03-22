"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const fileupload_middleware_1 = __importDefault(require("../../middleware/fileupload.middleware"));
const queryFeatures_middleware_1 = __importDefault(require("../../middleware/queryFeatures.middleware"));
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const cars_controller_1 = __importDefault(require("./cars.controller"));
const cars_validation_1 = __importDefault(require("./cars.validation"));
const carsRoutes = express_1.default.Router();
carsRoutes.post("/create", (0, authorization_middleware_1.default)(), (0, fileupload_middleware_1.default)("image", "cars", ["image/jpeg", "image/jpg", "image/png"]), cars_controller_1.default.createCars);
carsRoutes.get("/", (0, queryFeatures_middleware_1.default)("multiple"), cars_controller_1.default.getCars);
carsRoutes.get("/:id", (0, queryFeatures_middleware_1.default)("single"), cars_controller_1.default.getSigleCars);
carsRoutes.patch("/update/:id", (0, validateRequest_middleware_1.default)(cars_validation_1.default.updateReq), (0, fileupload_middleware_1.default)("image", "cars", ["image/jpeg", "image/jpg", "image/png"]), (0, authorization_middleware_1.default)(), cars_controller_1.default.updateCars);
carsRoutes.delete("/delete/:id", (0, authorization_middleware_1.default)(), cars_controller_1.default.deleteCars);
exports.default = carsRoutes;
