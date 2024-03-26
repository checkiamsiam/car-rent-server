import { Schema, model } from "mongoose";
import { ILocation } from "./location.interface";

const locationSchema = new Schema<ILocation>(
  {
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
        type: Schema.Types.ObjectId,
        ref: "cars",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// modal should define at last
export const Location = model<ILocation>("location", locationSchema);
