import express from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import searchController from "./search.contoller";
const searchRoutes = express.Router();

searchRoutes.get(
  "/:id",
  queryFeatures("multiple"),
  searchController.searchCarByLocation
);

export default searchRoutes;
