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
const cars_model_1 = require("../cars/cars.model");
const searchCarByLocation = (id, queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldsSelectionStage = Object.keys(queryFeatures.fields).length > 0
        ? { $project: queryFeatures.fields }
        : {
            $addFields: {},
        };
    const populateStage = [];
    if (queryFeatures.populate) {
        const populatedArray = queryFeatures.populate.split(" ");
        populatedArray.forEach((el) => {
            const is = el.includes("-");
            if (!is) {
                const stage = {
                    $lookup: {
                        from: el,
                        localField: el,
                        foreignField: "_id",
                        as: el,
                    },
                };
                populateStage.push(stage);
            }
            else {
                const [localField, from] = el.split("-");
                const stage = {
                    $lookup: {
                        from,
                        localField,
                        foreignField: "_id",
                        as: localField,
                    },
                };
                populateStage.push(stage);
            }
        });
    }
    const pagination = [];
    if (queryFeatures.limit) {
        pagination.push({ $limit: queryFeatures.limit });
    }
    if (queryFeatures.skip) {
        pagination.push({ $skip: queryFeatures.skip });
    }
    const pipeline = [
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
            $match: {
                $and: [
                    {
                        "location._id": new mongoose_1.default.Types.ObjectId(id),
                    },
                    queryFeatures.filters,
                ],
            },
        },
        {
            $sort: queryFeatures.sort,
        },
        fieldsSelectionStage,
        ...populateStage,
        {
            $facet: {
                data: pagination,
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
    const [result] = yield cars_model_1.Cars.aggregate(pipeline);
    return result;
});
const searchService = { searchCarByLocation };
exports.default = searchService;
