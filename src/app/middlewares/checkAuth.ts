import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utlis/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/users/users.model";
import { isActive } from '../modules/users/users.interface';

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No token Received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_TOKEN as string
      ) as JwtPayload;
      const isUserExists = await User.findOne({
        email: verifiedToken.email,
      });
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
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are Not Permitted ");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
