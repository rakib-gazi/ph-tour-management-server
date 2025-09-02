import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utlis/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles : string[])=>async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if(!accessToken){
        throw new AppError(403, "No token Received")
      }
      const verifiedToken = verifyToken(accessToken, envVars.JWT_TOKEN as string) as JwtPayload;
      if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "You are Not Permitted ")
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  }