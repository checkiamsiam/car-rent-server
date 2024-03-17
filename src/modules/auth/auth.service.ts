import httpStatus from "http-status";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwt.helper";
import AppError from "../../utils/customError.util";
import { User } from "../user/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new AppError("User does not exist", httpStatus.NOT_FOUND);
  }

  if (isUserExist.password && !(await isUserExist.comparePassword(password))) {
    throw new AppError("Password is incorrect", httpStatus.UNAUTHORIZED);
  }

  //create access token & refresh token
  const { email: userEmail, id } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { id, email: userEmail },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  return {
    accessToken,
    user: {
      id,
      email: userEmail,
    },
  };
};

export const authService = {
  loginUser,
};
