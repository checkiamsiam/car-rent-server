"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createReq = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({
            required_error: "Title is must required",
            invalid_type_error: "Title must be a string",
        }),
        mapIframe: zod_1.z
            .string({
            invalid_type_error: "MapIframe must be a string",
        })
            .optional(),
    })
        .strict(),
});
const updateReq = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Title must be a string",
        })
            .optional(),
        mapIframe: zod_1.z
            .string({
            invalid_type_error: "MapIframe must be a string",
        })
            .optional(),
    }),
});
const locationValidation = {
    createReq,
    updateReq,
};
exports.default = locationValidation;
