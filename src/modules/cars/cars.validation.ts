import { z } from "zod";

const createReq = z
  .object({
    title: z.string({
      required_error: "Title is must required",
      invalid_type_error: "Title must be a string",
    }),
    description: z.string({
      required_error: "Description is must required",
      invalid_type_error: "Description must be a string",
    }),
    rentPerDay: z.number({
      required_error: "Rent per day is must required",
      invalid_type_error: "Rent per day must be a number",
    }),
    imageUrl: z.string({
      required_error: "Image url is must required",
      invalid_type_error: "Image url must be a string",
    }),
    isAvailable: z.boolean({
      required_error: "Is available is must required",
      invalid_type_error: "Is available must be a boolean",
    }),
    feature: z.boolean({
      required_error: "Feature is must required",
      invalid_type_error: "Feature must be a boolean",
    }),
    category: z
      .string({
        required_error: "Category is must required",
        invalid_type_error: "Category must be a string",
      })
      .refine(
        (data) => {
          return [
            "medium",
            "premium",
            "small",
            "large",
            "SUVs",
            "People Carrier",
            "Estate",
          ].includes(data);
        },
        {
          message:
            "Category must be a medium, premium, small, large, SUVs, People Carrier or Estate",
        }
      ),
    seats: z.number({
      required_error: "Seats is must required",
      invalid_type_error: "Seats must be a number",
    }),
    bags: z.number({
      required_error: "Bags is must required",
      invalid_type_error: "Bags must be a number",
    }),
    dors: z.number({
      required_error: "Dors is must required",
      invalid_type_error: "Dors must be a number",
    }),
    ac: z.boolean({
      required_error: "AC is must required",
      invalid_type_error: "AC must be a boolean",
    }),
    automatic: z.boolean({
      required_error: "Automatic is must required",
      invalid_type_error: "Automatic must be a boolean",
    }),
    fuel: z
      .string({
        required_error: "Fuel is must required",
        invalid_type_error: "Fuel must be a string",
      })
      .refine(
        (data) => {
          return ["petrol", "diesel", "cng", "electric"].includes(data);
        },
        { message: "Fuel must be a petrol, diesel, cng or electric" }
      ),
    location: z.string({
      required_error: "Location is must required",
      invalid_type_error: "Location must be a string",
    }),
  })
  .strict();

const updateReq = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  rentPerDay: z
    .number({
      invalid_type_error: "Rent per day must be a number",
    })
    .optional(),
  imageUrl: z
    .string({
      invalid_type_error: "Image url must be a string",
    })
    .optional(),
  isAvailable: z
    .boolean({
      invalid_type_error: "Is available must be a boolean",
    })
    .optional(),
  feature: z
    .boolean({
      invalid_type_error: "Feature must be a boolean",
    })
    .optional(),
  category: z
    .string({
      invalid_type_error: "Category must be a string",
    })
    .refine(
      (data) => {
        return [
          "medium",
          "premium",
          "small",
          "large",
          "SUVs",
          "People Carrier",
          "Estate",
        ].includes(data);
      },
      {
        message:
          "Category must be a medium, premium, small, large, SUVs, People Carrier or Estate",
      }
    )
    .optional(),
  seats: z
    .number({
      invalid_type_error: "Seats must be a number",
    })
    .optional(),
  bags: z
    .number({
      invalid_type_error: "Bags must be a number",
    })
    .optional(),
  dors: z
    .number({
      invalid_type_error: "Dors must be a number",
    })
    .optional(),
  ac: z
    .boolean({
      invalid_type_error: "AC must be a boolean",
    })
    .optional(),
  automatic: z
    .boolean({
      invalid_type_error: "Automatic must be a boolean",
    })
    .optional(),
  fuel: z
    .string({
      invalid_type_error: "Fuel must be a string",
    })
    .refine(
      (data) => {
        return ["petrol", "diesel", "cng", "electric"].includes(data);
      },
      { message: "Fuel must be a petrol, diesel, cng or electric" }
    )
    .optional(),
  location: z
    .string({
      invalid_type_error: "Location must be a string",
    })
    .optional(),
});

const carsValidation = {
  createReq,
  updateReq,
};

export default carsValidation;
