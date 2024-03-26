"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createReq = zod_1.z
    .object({
    title: zod_1.z.string({
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
    }),
    description: zod_1.z.string({
        required_error: "Description is must required",
        invalid_type_error: "Description must be a string",
    }),
    rentPerDay: zod_1.z.number({
        required_error: "Rent per day is must required",
        invalid_type_error: "Rent per day must be a number",
    }),
    imageUrl: zod_1.z.string({
        required_error: "Image url is must required",
        invalid_type_error: "Image url must be a string",
    }),
    isAvailable: zod_1.z.boolean({
        required_error: "Is available is must required",
        invalid_type_error: "Is available must be a boolean",
    }),
    feature: zod_1.z.boolean({
        required_error: "Feature is must required",
        invalid_type_error: "Feature must be a boolean",
    }),
    category: zod_1.z
        .string({
        required_error: "Category is must required",
        invalid_type_error: "Category must be a string",
    })
        .refine((data) => {
        return [
            "medium",
            "premium",
            "small",
            "large",
            "SUVs",
            "People Carrier",
            "Estate",
        ].includes(data);
    }, {
        message: "Category must be a medium, premium, small, large, SUVs, People Carrier or Estate",
    }),
    seats: zod_1.z.number({
        required_error: "Seats is must required",
        invalid_type_error: "Seats must be a number",
    }),
    bags: zod_1.z.number({
        required_error: "Bags is must required",
        invalid_type_error: "Bags must be a number",
    }),
    dors: zod_1.z.number({
        required_error: "Dors is must required",
        invalid_type_error: "Dors must be a number",
    }),
    ac: zod_1.z.boolean({
        required_error: "AC is must required",
        invalid_type_error: "AC must be a boolean",
    }),
    automatic: zod_1.z.boolean({
        required_error: "Automatic is must required",
        invalid_type_error: "Automatic must be a boolean",
    }),
    fuel: zod_1.z
        .string({
        required_error: "Fuel is must required",
        invalid_type_error: "Fuel must be a string",
    })
        .refine((data) => {
        return ["petrol", "diesel", "cng", "electric"].includes(data);
    }, { message: "Fuel must be a petrol, diesel, cng or electric" }),
    location: zod_1.z.string({
        required_error: "Location is must required",
        invalid_type_error: "Location must be a string",
    }),
})
    .strict();
const updateReq = zod_1.z.object({
    title: zod_1.z
        .string({
        invalid_type_error: "Title must be a string",
    })
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: "Description must be a string",
    })
        .optional(),
    rentPerDay: zod_1.z
        .number({
        invalid_type_error: "Rent per day must be a number",
    })
        .optional(),
    imageUrl: zod_1.z
        .string({
        invalid_type_error: "Image url must be a string",
    })
        .optional(),
    isAvailable: zod_1.z
        .boolean({
        invalid_type_error: "Is available must be a boolean",
    })
        .optional(),
    feature: zod_1.z
        .boolean({
        invalid_type_error: "Feature must be a boolean",
    })
        .optional(),
    category: zod_1.z
        .string({
        invalid_type_error: "Category must be a string",
    })
        .refine((data) => {
        return [
            "medium",
            "premium",
            "small",
            "large",
            "SUVs",
            "People Carrier",
            "Estate",
        ].includes(data);
    }, {
        message: "Category must be a medium, premium, small, large, SUVs, People Carrier or Estate",
    })
        .optional(),
    seats: zod_1.z
        .number({
        invalid_type_error: "Seats must be a number",
    })
        .optional(),
    bags: zod_1.z
        .number({
        invalid_type_error: "Bags must be a number",
    })
        .optional(),
    dors: zod_1.z
        .number({
        invalid_type_error: "Dors must be a number",
    })
        .optional(),
    ac: zod_1.z
        .boolean({
        invalid_type_error: "AC must be a boolean",
    })
        .optional(),
    automatic: zod_1.z
        .boolean({
        invalid_type_error: "Automatic must be a boolean",
    })
        .optional(),
    fuel: zod_1.z
        .string({
        invalid_type_error: "Fuel must be a string",
    })
        .refine((data) => {
        return ["petrol", "diesel", "cng", "electric"].includes(data);
    }, { message: "Fuel must be a petrol, diesel, cng or electric" })
        .optional(),
    location: zod_1.z
        .string({
        invalid_type_error: "Location must be a string",
    })
        .optional(),
});
const carsValidation = {
    createReq,
    updateReq,
};
exports.default = carsValidation;
