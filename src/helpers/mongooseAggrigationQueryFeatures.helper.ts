import { PipelineStage } from "mongoose";
import { IQueryFeatures } from "../interfaces/queryFeatures.interface";

interface IOptions {
  searchFields: string[];
}

const makeQueryFeatureStages = (
  queryFeatures: IQueryFeatures,
  options: IOptions
): PipelineStage[] => {
  const fieldsSelectionStage: PipelineStage =
    Object.keys(queryFeatures.fields).length > 0
      ? { $project: queryFeatures.fields }
      : {
          $addFields: {},
        };

  const searchConditions = options.searchFields.map((filed) => {
    return {
      [filed]: {
        $regex: queryFeatures.searchKey,
        $options: "i",
      },
    };
  });

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
      $match: {
        $and: [
          queryFeatures.filters,
          {
            $or: searchConditions,
          },
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

  return pipeline;
};

export default makeQueryFeatureStages;
