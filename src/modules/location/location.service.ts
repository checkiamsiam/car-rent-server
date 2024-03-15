import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import { IQueryFeatures, IQueryResult } from "../../interfaces/queryFeatures.interface";
import { ILocation } from "./location.interface";
import { Location } from "./location.model";

const create = async (payload: ILocation): Promise<ILocation> => {
  const result = await Location.create(payload);
  return result;
};

const getLocations = async (queryFeatures: IQueryFeatures): Promise<IQueryResult<ILocation>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(queryFeatures, { searchFields: ["name"] });

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<ILocation>[] = await Location.aggregate<IQueryResult<ILocation>>(pipeline);

  return result;
};

const getSingleLocation = async (id: string, queryFeatures: IQueryFeatures): Promise<Partial<ILocation> | null> => {
  const result: Partial<ILocation> | null = await Location.findById(id).select(queryFeatures.fields).lean();

  return result;
};

const updateLocation = async (id: string, payload: Partial<ILocation>): Promise<Partial<ILocation> | null> => {
  const result: Partial<ILocation> | null = await Location.findByIdAndUpdate(id, payload, { new: true }).lean();

  return result;
};

const deleteLocation = async (id: string) => {
  const result: Partial<ILocation> | null = await Location.findByIdAndDelete(id).lean();

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
