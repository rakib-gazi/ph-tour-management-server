/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { AuthServices } from './auth.service';

const credentialsLogin = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const loginInfo = await AuthServices.credentialsLogin(req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message: "User Logged In Successfully",
      data:loginInfo
    })
})

export const AuthControllers = {
    credentialsLogin
}