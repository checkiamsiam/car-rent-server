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
const location_model_1 = require("../location/location.model");
const searchCarByLocation = (queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(queryFeatures.searchKey);
    const matchStage = isValidObjectId
        ? { _id: new mongoose_1.default.Types.ObjectId(queryFeatures.searchKey) } // Match by ObjectI
        : { name: { $regex: queryFeatures.searchKey, $options: "i" } };
    const pipeline = [
        {
            $match: matchStage,
        },
        {
            $sort: queryFeatures.sort,
        },
        {
            $unwind: "$cars",
        },
        {
            $lookup: {
                from: "cars",
                localField: "cars",
                foreignField: "_id",
                as: "cars",
            },
        },
        {
            $unwind: "$cars", // Unwind the cars array
        },
        {
            $project: {
                _id: 0, // Exclude the _id field
                cars: 1, // Include only the cars array
            },
        },
        {
            $replaceRoot: { newRoot: "$cars" }, // Replace the root with the cars objects
        },
        {
            $lookup: {
                from: "locations",
                localField: "location",
                foreignField: "_id",
                as: "location",
            },
        },
        {
            $unwind: "$location",
        },
        {
            $addFields: {
                location: "$location.name",
            },
        },
        {
            $facet: {
                data: [{ $skip: queryFeatures.skip }, { $limit: queryFeatures.limit }],
                total: [{ $count: "total" }],
            },
        },
        {
            $project: {
                total: { $arrayElemAt: ["$total.total", 0] },
                data: 1,
            },
        },
    ];
    const [result] = yield location_model_1.Location.aggregate(pipeline);
    return result;
});
const searchService = { searchCarByLocation };
exports.default = searchService;
