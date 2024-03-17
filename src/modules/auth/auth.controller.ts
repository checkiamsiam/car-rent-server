import { Request, RequestHandler, Response } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import sendResponse from "../../utils/sendResponse.util";
import { ILoginUserResponse } from "./auth.interface";
import { authService } from "./auth.service";

const login: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await authService.loginUser(loginData);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully !",
      data: result,
    });
  }
);

const authController = { login };

export default authController;
