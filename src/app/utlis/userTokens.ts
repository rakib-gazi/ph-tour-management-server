import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config/env";
import { isActive, IUser } from "../modules/users/users.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/users/users.model";
import AppError from "../errorHelpers/AppError";

export const createUserToken = (user: Partial<IUser>) => {
  const JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    JwtPayload,
    envVariable.JWT_TOKEN,
    envVariable.JWT_EXP
  );
  const refreshToken = generateToken(
    JwtPayload,
    envVariable.Refresh_Token,
    envVariable.Refresh_EXP
  );
  return {
    accessToken,
    refreshToken,
  };
};
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVariable.Refresh_Token
  ) as JwtPayload;
  const isUserExists = await User.findOne({ email: verifyRefreshToken.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
  }
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
  }
  if (
    isUserExists.isActive === isActive.BLOCKED ||
    isUserExists.isActive === isActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExists.isActive}`
    );
  }
  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is Deleted`);
  }

  const JwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  };
  const accessToken = generateToken(
    JwtPayload,
    envVariable.JWT_TOKEN,
    envVariable.JWT_EXP
  );
  return accessToken;
};
