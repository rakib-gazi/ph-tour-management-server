/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utlis/setcookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utlis/userTokens";
import { envVariable } from "../../config/env";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    // res.cookie("accessToken", loginInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No Refresh token from cookies"
      );
    }
    // const refreshToken = req.headers.authorization;
    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string
    );
    // res.cookie("accessToken", tokenInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access Token Retrieved Successfully",
      data: tokenInfo,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const newUpdatedPassword = await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Reset Successfully",
      data: null,
    });
  }
);
const googleController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state? req.query.state as string : "";
    if(redirectTo.startsWith("/")){
      redirectTo= redirectTo.slice(1);
    }
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }
    const tokenInfo = createUserToken(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${envVariable.FRONTED_URL}/${redirectTo}`)
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleController,
};
