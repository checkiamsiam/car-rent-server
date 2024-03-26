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
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncError_util_1 = __importDefault(require("../../utils/catchAsyncError.util"));
const customError_util_1 = __importDefault(require("../../utils/customError.util"));
const sendResponse_util_1 = __importDefault(require("../../utils/sendResponse.util"));
const cars_service_1 = __importDefault(require("./cars.service"));
const createCars = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const body = JSON.parse(req.body.payload);
    if (!file) {
        throw new customError_util_1.default("Image isn't Upload Properly", http_status_1.default.INTERNAL_SERVER_ERROR);
    }
    else {
        body.imageUrl = file.path;
    }
    const result = yield cars_service_1.default.create(body);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars created successfully",
        data: result,
    });
}));
const getCars = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = yield cars_service_1.default.getCars(req.queryFeatures);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: getResult.data,
        meta: {
            page: req.queryFeatures.page,
            limit: req.queryFeatures.limit,
            total: getResult.total || 0,
        },
    });
}));
const getSigleCars = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cars_service_1.default.getSingleCar(id, req.queryFeatures);
    if (!result) {
        throw new customError_util_1.default("Cars Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const updateCars = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = req.file;
    const updatePayload = req.body.payload
        ? JSON.parse(req.body.payload)
        : {};
    if (file) {
        updatePayload.imageUrl = file.path;
    }
    // await carsValidation.updateReq.parseAsync(updatePayload);
    const result = yield cars_service_1.default.updateCar(id, updatePayload);
    if (!result) {
        throw new customError_util_1.default("Requested Document Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Document Updated Successfully",
        data: result,
    });
}));
const deleteCars = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cars_service_1.default.deleteCar(id);
    if (!result) {
        throw new customError_util_1.default("Requrested Document Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Document Deleted Successfully",
    });
}));
const carsController = {
    createCars,
    getCars,
    getSigleCars,
    updateCars,
    deleteCars,
};
exports.default = carsController;
