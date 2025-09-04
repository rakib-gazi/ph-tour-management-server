/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./users.service";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { verifyToken } from "../../utlis/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
export const userRoutes = express.Router();

const createUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const user = await UserServices.createUser(req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message: "User Created Successfully",
      data:user
    })
})
const getAllUsers = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const result = await UserServices.getAllUsers();
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message: "All Users Retrieved Successfully",
      meta: result.meta,
      data:result.data,
    })
})
const updateUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const userId = req.params.id;
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, "Authorization token missing");
  // }
  // const verifiedToken = verifyToken(token, envVars.JWT_TOKEN as string)as JwtPayload ;
  const verifiedToken = req.user as JwtPayload;
  const payload = req.body;
  const user = await UserServices.updateUser(userId,payload,verifiedToken);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message: "User Updatd Successfully",
      data:user
    })
})
export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser
}
