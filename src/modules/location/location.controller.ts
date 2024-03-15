import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import locationService from "./location.service";
import { ILocation } from "./location.interface";

const createLocation: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const result = await locationService.create(req.body);
  sendResponse<ILocation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Location created successfully",
    data: result,
  });
});

const getLocations: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const getResult = await locationService.getLocations(req.queryFeatures);
  sendResponse<Partial<ILocation>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: getResult.data,
    meta: {
      page: req.queryFeatures.page,
      limit: req.queryFeatures.limit,
      total: getResult.total || 0,
    },
  });
});
const getSigleLocation: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result: Partial<ILocation> | null = await locationService.getSingleLocation(id, req.queryFeatures);
  if (!result) {
    throw new AppError("Location Not Found", httpStatus.NOT_FOUND);
  }
  sendResponse<Partial<ILocation>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateLocation: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updatePayload: Partial<ILocation> = req.body;
  
  const result: Partial<ILocation> | null = await locationService.updateLocation(id, updatePayload);

  if (!result) {
    throw new AppError("Requested Document Not Found", httpStatus.NOT_FOUND);
  }
  sendResponse<Partial<ILocation>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Document Updated Successfully",
    data: result,
  });
});
const deleteLocation: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const result = await locationService.deleteLocation(id);

  if (!result) {
    throw new AppError("Requrested Document Not Found", httpStatus.NOT_FOUND);
  }
  sendResponse<Partial<ILocation>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Document Deleted Successfully",
  });
});

const locationController = {
  createLocation,
  getLocations,
  getSigleLocation,
  updateLocation,
  deleteLocation,
};
export default locationController;
