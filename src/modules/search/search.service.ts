import mongoose, { PipelineStage } from "mongoose";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { Location } from "../location/location.model";

const searchCarByLocation = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<any>> => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(
    queryFeatures.searchKey
  );

  const matchStage = isValidObjectId
    ? { _id: new mongoose.Types.ObjectId(queryFeatures.searchKey) } // Match by ObjectI
    : { name: { $regex: queryFeatures.searchKey, $options: "i" } };

  const pipeline: PipelineStage[] = [
    {
      $match: matchStage,
    },
    {
      $sort: queryFeatures.sort,
    },
    {
      $unwind: "$cars",
    },
    {
      $lookup: {
        from: "cars",
        localField: "cars",
        foreignField: "_id",
        as: "cars",
      },
    },
    {
      $unwind: "$cars", // Unwind the cars array
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        cars: 1, // Include only the cars array
      },
    },
    {
      $replaceRoot: { newRoot: "$cars" }, // Replace the root with the cars objects
    },
    {
      $lookup: {
        from: "locations",
        localField: "location",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $unwind: "$location",
    },
    {
      $addFields: {
        location: "$location.name",
      },
    },
    {
      $facet: {
        data: [{ $skip: queryFeatures.skip }, { $limit: queryFeatures.limit }],
        total: [{ $count: "total" }],
      },
    },
    {
      $project: {
        total: { $arrayElemAt: ["$total.total", 0] },
        data: 1,
      },
    },
  ];

  const [result]: IQueryResult<any>[] = await Location.aggregate<
    IQueryResult<any>
  >(pipeline);

  return result;
};

const searchService = { searchCarByLocation };

export default searchService;
