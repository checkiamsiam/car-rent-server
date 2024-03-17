import { Model, ObjectId } from "mongoose";
import { ICar } from "../cars/cars.interface";

export interface ILocation {
  name: string;
  cars: ICar[] | ObjectId[];
}

export type LocationModel = Model<ILocation, object>;
