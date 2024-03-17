import mongoose, { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { ILocation } from "./location.interface";
import { Location } from "./location.model";
import { Cars } from "../cars/cars.model";

const create = async (payload: ILocation): Promise<ILocation> => {
  const result = await Location.create(payload);
  return result;
};

const getLocations = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<ILocation>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["name"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<ILocation>[] = await Location.aggregate<
    IQueryResult<ILocation>
  >(pipeline);

  return result;
};

const getSingleLocation = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<ILocation> | null> => {
  console.log(queryFeatures.populate);
  const result: Partial<ILocation> | null = await Location.findById(id)
    .select(queryFeatures.fields)
    .populate(queryFeatures.populate)
    .lean();

  return result;
};

const updateLocation = async (
  id: string,
  payload: Partial<ILocation>
): Promise<Partial<ILocation> | null> => {
  const result: Partial<ILocation> | null = await Location.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  ).lean();

  return result;
};

const deleteLocation = async (id: string) => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    await Cars.deleteMany({ location: id });
    result = await Location.findByIdAndDelete(id).lean();
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  } finally {
    await session.endSession();
  }
  return result;
};

const locationService = {
  create,
  getLocations,
  getSingleLocation,
  updateLocation,
  deleteLocation,
};

export default locationService;
