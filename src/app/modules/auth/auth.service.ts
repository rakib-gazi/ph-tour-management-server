/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
// import { IUser } from "../users/users.interface";
import { User } from "../users/users.model";
import {
  createNewAccessTokenWithRefreshToken,
} from "../../utlis/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../../config/env";
// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExists = await User.findOne({ email });
//   if (!isUserExists) {
//     throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
//   }
//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExists.password as string
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
//   }
//   const userTokens = createUserToken(isUserExists);
//   // delete password
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...rest } = isUserExists.toObject();

//   return {
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest,
//   };
// };
const getNewAccessToken = async (refreshToken: string) => {
  const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
  /// eslint-disable-next-line @typescript-eslint/no-unused-vars

  return {
    accessToken: accessToken,
  };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);
  /// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isOldPasswordMatched = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Old Password Does Not Matched"
    );
  }
  user!.password = await bcryptjs.hash(newPassword, envVariable.SALT_ROUND);
  user!.save();
};

export const AuthServices = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
