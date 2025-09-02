import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../users/users.interface";
import { User } from "../users/users.model";
import { generateToken } from "../../utlis/jwt";
import { envVars } from "../../config/env";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExists.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }
  const JwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  };
  const accessToken = generateToken(JwtPayload, envVars.JWT_TOKEN as string, envVars.JWT_EXP as string);
  

  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
