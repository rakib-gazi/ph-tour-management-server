/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./users.interface";
import { User } from "./users.model";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists");
  }
  const hashedPassword = await bcryptjs.hash(password as string, 15);
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email!,
  };
  const user = await User.create({
    email,
    password:hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};
const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const updateUser = async (userId:string, payload :Partial<IUser>, decodedToken: JwtPayload)=>{
  const isUserExists = await User.findById(userId);
  if(!isUserExists){
    throw new AppError(httpStatus.NOT_FOUND," User Not Found")
  }
  if(payload.role){
    if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
      throw new AppError(httpStatus.FORBIDDEN," You are not authorized")
    }
    if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
      throw new AppError(httpStatus.FORBIDDEN," You are not authorized")
    }
  }
  if(payload.isActive || payload.isDeleted || payload.isVerified){
     if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
      throw new AppError(httpStatus.FORBIDDEN," You are not authorized")
    }
  }
  if(payload.password){
    payload.password = await bcryptjs.hash(payload.password, Number(envVars.SALT_ROUND))
  }
  const newUpdatedUser = await User.findByIdAndUpdate(userId,payload,{new:true, runValidators:true})
  return newUpdatedUser;

}
export const UserServices = {
  createUser,
  getAllUsers,
  updateUser
};
