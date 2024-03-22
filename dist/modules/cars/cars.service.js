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
const location_model_1 = require("../location/location.model");
const cars_model_1 = require("./cars.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        result = yield cars_model_1.Cars.create(payload);
        yield location_model_1.Location.updateMany({ _id: payload.location }, { $push: { cars: result._id } });
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
const getCars = (queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFeatureStages = (0, mongooseAggrigationQueryFeatures_helper_1.default)(queryFeatures, { searchFields: ["title", "description", "rentPerDay", "fuel"] });
    const pipeline = [...queryFeatureStages];
    const [result] = yield cars_model_1.Cars.aggregate(pipeline);
    return result;
});
const getSingleCar = (id, queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.Cars.findById(id)
        .select(queryFeatures.fields)
        .populate(queryFeatures.populate)
        .lean();
    return result;
});
const updateCar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        result = yield cars_model_1.Cars.findByIdAndUpdate(id, payload, { new: true }).lean();
        if (payload.location) {
            yield location_model_1.Location.updateMany({ cars: id }, { $pull: { cars: id } });
            yield location_model_1.Location.updateMany({ _id: payload.location }, { $push: { cars: id } });
        }
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
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        yield location_model_1.Location.updateMany({ cars: id }, { $pull: { cars: id } });
        result = yield cars_model_1.Cars.findByIdAndDelete(id).lean();
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
const carsService = {
    create,
    getCars,
    getSingleCar,
    updateCar,
    deleteCar,
};
exports.default = carsService;
