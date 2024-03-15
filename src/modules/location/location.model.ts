import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../utils/customError.util";
import { ILocation } from "./location.interface";

const locationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

locationSchema.pre("save", async function (next) {
  const isExist = await Location.findOne({
    name: this.name,
  });
  if (isExist) {
    throw new AppError("Already exist !", httpStatus.CONFLICT);
  }
  next();
});

// modal should define at last
export const Location = model<ILocation>("location", locationSchema);
