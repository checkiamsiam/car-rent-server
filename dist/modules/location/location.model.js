"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    mapIframe: {
        type: String,
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
// modal should define at last
exports.Location = (0, mongoose_1.model)("location", locationSchema);
