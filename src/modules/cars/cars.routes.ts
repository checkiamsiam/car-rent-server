import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import uploadToCloudinary from "../../middleware/fileupload.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import carsController from "./cars.controller";
import carsValidation from "./cars.validation";

const carsRoutes: Router = express.Router();

carsRoutes.post(
  "/create",
  authorization(),
  uploadToCloudinary("image", "cars", ["image/jpeg", "image/jpg", "image/png"]),
  carsController.createCars
);

carsRoutes.get("/", queryFeatures("multiple"), carsController.getCars);

carsRoutes.get("/:id", queryFeatures("single"), carsController.getSigleCars);

carsRoutes.patch(
  "/update/:id",
  validateRequest(carsValidation.updateReq),
  uploadToCloudinary("image", "cars", ["image/jpeg", "image/jpg", "image/png"]),
  authorization(),
  carsController.updateCars
);

carsRoutes.delete("/delete/:id", authorization(), carsController.deleteCars);

export default carsRoutes;
