/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./users.service";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
export const userRoutes = express.Router();

const createUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const user = await UserServices.createUser(req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message: "User Created Successfully",
      data:user
    })
  // res.status(httpStatus.CREATED).json({
  //   message:"User Created Successfully",
  //   user
  // })
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
    // res.status(httpStatus.OK).json({
    //   success:true,
    //   message: "All Users Retrieved Successfully",
    //   users:users
    // })
})
export const UserControllers = {
  createUser,
  getAllUsers
}
