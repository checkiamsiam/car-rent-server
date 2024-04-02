"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryFeatures = (documentNumber) => {
    return (req, res, next) => {
        // set fileds that wanted
        const fieldsObj = {};
        // select fields
        if (req.query.fields) {
            let fields = String(req.query.fields);
            fields = fields.split(",").join(" ");
            // create fields object
            fields.split(" ").forEach((el) => {
                fieldsObj[el] = 1;
            });
        }
        // lookup control
        let populate;
        if (req.query.populate) {
            populate = String(req.query.populate);
            populate = populate.split(",").join(" ");
        }
        else {
            populate = "";
        }
        if (documentNumber === "single") {
            const queryFeaturesObj = {
                fields: fieldsObj,
                populate,
            };
            req.queryFeatures = queryFeaturesObj;
        }
        else {
            // set limit and skip to the request
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || undefined;
            const skip = limit ? (page - 1) * limit : undefined;
            const searchKey = req.query.searchKey
                ? String(req.query.searchKey)
                : "";
            let sort = String(req.query.sort);
            sort = sort.split(",").join(" ");
            // create sort object
            const sortObj = {};
            sort.split(" ").forEach((el) => {
                if (el.startsWith("-")) {
                    sortObj[el.slice(1)] = -1;
                }
                else {
                    sortObj[el] = 1;
                }
            });
            // get filters
            const query = req.query;
            const filters = Object.assign({}, query);
            const excludedFields = [
                "page",
                "sort",
                "limit",
                "fields",
                "searchKey",
                "populate",
            ];
            excludedFields.forEach((el) => delete filters[el]);
            Object.keys(filters).forEach((key) => {
                if (filters[key] === "true") {
                    filters[key] = true;
                }
                else if (filters[key] === "false") {
                    filters[key] = false;
                }
                else if (Number(filters[key])) {
                    filters[key] = Number(filters[key]);
                }
            });
            const queryFeaturesObj = {
                page,
                limit,
                skip,
                fields: fieldsObj,
                filters,
                populate,
                sort: sortObj,
                searchKey,
            };
            req.queryFeatures = queryFeaturesObj;
        }
        next();
    };
};
exports.default = queryFeatures;
