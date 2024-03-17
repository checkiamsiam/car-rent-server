import { Model, ObjectId } from "mongoose";
import { ILocation } from "../location/location.interface";

export interface ICar {
  title: string;
  description?: string;
  rentPerDay: number;
  imageUrl: string;
  isAvailable: boolean;
  seats: number;
  bags: number;
  dors: number;
  ac: boolean;
  automatic: boolean;
  fuel: "petrol" | "diesel" | "cng" | "electric";
  location: ILocation | ObjectId;
}

export type CarModel = Model<ICar, object>;
