"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeQueryFeatureStages = (queryFeatures, options) => {
    const fieldsSelectionStage = Object.keys(queryFeatures.fields).length > 0
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
    const populateStage = [];
    if (queryFeatures.populate) {
        const populatedArray = queryFeatures.populate.split(" ");
        populatedArray.forEach((el) => {
            const is = el.includes("-");
            if (!is) {
                const stage = {
                    $lookup: {
                        from: el,
                        localField: el,
                        foreignField: "_id",
                        as: el,
                    },
                };
                populateStage.push(stage);
            }
            else {
                const [localField, from] = el.split("-");
                const stage = {
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
    const pipeline = [
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
exports.default = makeQueryFeatureStages;
