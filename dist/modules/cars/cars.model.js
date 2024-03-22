"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cars = exports.carsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.carsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    bags: {
        type: Number,
        required: true,
    },
    dors: {
        type: Number,
        required: true,
    },
    ac: {
        type: Boolean,
        required: true,
    },
    automatic: {
        type: Boolean,
        required: true,
    },
    fuel: {
        type: String,
        enum: ["petrol", "diesel", "cng", "electric"],
        required: true,
    },
    location: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "location",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// modal should define at last
exports.Cars = (0, mongoose_1.model)("cars", exports.carsSchema);
