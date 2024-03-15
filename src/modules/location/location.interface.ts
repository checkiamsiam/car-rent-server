import { Model } from "mongoose";


export interface ILocation {
  name: string;
  cars: any[];
}

export type LocationModel = Model<ILocation, object>;


