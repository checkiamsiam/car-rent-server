import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { ICar } from "./cars.interface";
import carsService from "./cars.service";

const createCars: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const file = req.file;
    const body: ICar = JSON.parse(req.body.payload);
    if (!file) {
      throw new AppError(
        "Image isn't Upload Properly",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    } else {
      body.imageUrl = file.path;
    }

    const result = await carsService.create(body);
    sendResponse<ICar>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cars created successfully",
      data: result,
    });
  }
);

const getCars: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await carsService.getCars(req.queryFeatures);
    sendResponse<Partial<ICar>[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: getResult.data,
      meta: {
        page: req.queryFeatures.page,
        limit: req.queryFeatures.limit,
        total: getResult.total || 0,
      },
    });
  }
);
const getSigleCars: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<ICar> | null = await carsService.getSingleCar(
      id,
      req.queryFeatures
    );
    if (!result) {
      throw new AppError("Cars Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<ICar>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const updateCars: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const file = req.file;
    const updatePayload: Partial<ICar> = req.body.payload
      ? JSON.parse(req.body.payload)
      : {};
    if (file) {
      updatePayload.imageUrl = file.path;
    }

    // await carsValidation.updateReq.parseAsync(updatePayload);

    const result: Partial<ICar> | null = await carsService.updateCar(
      id,
      updatePayload
    );

    if (!result) {
      throw new AppError("Requested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<ICar>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Updated Successfully",
      data: result,
    });
  }
);
const deleteCars: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await carsService.deleteCar(id);

    if (!result) {
      throw new AppError("Requrested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<ICar>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Deleted Successfully",
    });
  }
);

const carsController = {
  createCars,
  getCars,
  getSigleCars,
  updateCars,
  deleteCars,
};
export default carsController;
