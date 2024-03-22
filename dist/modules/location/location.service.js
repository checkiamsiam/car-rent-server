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
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseAggrigationQueryFeatures_helper_1 = __importDefault(require("../../helpers/mongooseAggrigationQueryFeatures.helper"));
const location_model_1 = require("./location.model");
const cars_model_1 = require("../cars/cars.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield location_model_1.Location.create(payload);
    return result;
});
const getLocations = (queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFeatureStages = (0, mongooseAggrigationQueryFeatures_helper_1.default)(queryFeatures, { searchFields: ["name"] });
    const pipeline = [...queryFeatureStages];
    const [result] = yield location_model_1.Location.aggregate(pipeline);
    return result;
});
const getSingleLocation = (id, queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(queryFeatures.populate);
    const result = yield location_model_1.Location.findById(id)
        .select(queryFeatures.fields)
        .populate(queryFeatures.populate)
        .lean();
    return result;
});
const updateLocation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield location_model_1.Location.findByIdAndUpdate(id, payload, { new: true }).lean();
    return result;
});
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        yield cars_model_1.Cars.deleteMany({ location: id });
        result = yield location_model_1.Location.findByIdAndDelete(id).lean();
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    finally {
        yield session.endSession();
    }
    return result;
});
const locationService = {
    create,
    getLocations,
    getSingleLocation,
    updateLocation,
    deleteLocation,
};
exports.default = locationService;
