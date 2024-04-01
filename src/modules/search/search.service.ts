import mongoose, { PipelineStage } from "mongoose";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { Cars } from "../cars/cars.model";

const searchCarByLocation = async (
  id: string,

  queryFeatures: IQueryFeatures
): Promise<IQueryResult<any>> => {
  const fieldsSelectionStage: PipelineStage =
    Object.keys(queryFeatures.fields).length > 0
      ? { $project: queryFeatures.fields }
      : {
          $addFields: {},
        };

  const populateStage: PipelineStage[] = [];

  if (queryFeatures.populate) {
    const populatedArray = queryFeatures.populate.split(" ");

    populatedArray.forEach((el) => {
      const is = el.includes("-");

      if (!is) {
        const stage: PipelineStage = {
          $lookup: {
            from: el,
            localField: el,
            foreignField: "_id",
            as: el,
          },
        };
        populateStage.push(stage);
      } else {
        const [localField, from] = el.split("-");
        const stage: PipelineStage = {
          $lookup: {
            from,
            localField,
            foreignField: "_id",
            as: localField,
          },
        };
        populateStage.push(stage);
      }
    });
  }

  const pagination = [];
  if (queryFeatures.limit) {
    pagination.push({ $limit: queryFeatures.limit });
  }
  if (queryFeatures.skip) {
    pagination.push({ $skip: queryFeatures.skip });
  }

  const pipeline: PipelineStage[] = [
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
      $match: {
        $and: [
          {
            "location._id": new mongoose.Types.ObjectId(id),
          },
          queryFeatures.filters,
        ],
      },
    },
    {
      $sort: queryFeatures.sort,
    },
    fieldsSelectionStage,
    ...populateStage,
    {
      $facet: {
        data: pagination,
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

  const [result]: IQueryResult<any>[] = await Cars.aggregate<IQueryResult<any>>(
    pipeline
  );

  return result;
};

const searchService = { searchCarByLocation };

export default searchService;
