import { z } from "zod";

const createReq = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
      }),
    })
    .strict(),
});
const updateReq = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
      })
      .optional(),
  }),
});

const locationValidation = {
  createReq,
  updateReq,
};

export default locationValidation;
