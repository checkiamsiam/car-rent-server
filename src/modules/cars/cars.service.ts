import mongoose, { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { Location } from "../location/location.model";
import { ICar } from "./cars.interface";
import { Cars } from "./cars.model";

const create = async (payload: ICar): Promise<ICar> => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    result = await Cars.create(payload);
    await Location.updateMany(
      { _id: payload.location },
      { $push: { cars: result._id } }
    );
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

const getCars = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<ICar>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["title", "description", "rentPerDay", "fuel"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<ICar>[] = await Cars.aggregate<
    IQueryResult<ICar>
  >(pipeline);

  return result;
};

const getSingleCar = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<ICar> | null> => {
  const result: Partial<ICar> | null = await Cars.findById(id)
    .select(queryFeatures.fields)
    .populate(queryFeatures.populate)
    .lean();

  return result;
};

const updateCar = async (
  id: string,
  payload: Partial<ICar>
): Promise<Partial<ICar> | null> => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    result = await Cars.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (payload.location) {
      await Location.updateMany({ cars: id }, { $pull: { cars: id } });
      await Location.updateMany(
        { _id: payload.location },
        { $push: { cars: id } }
      );
    }
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

const deleteCar = async (id: string) => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    await Location.updateMany({ cars: id }, { $pull: { cars: id } });
    result = await Cars.findByIdAndDelete(id).lean();
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

const carsService = {
  create,
  getCars,
  getSingleCar,
  updateCar,
  deleteCar,
};

export default carsService;
