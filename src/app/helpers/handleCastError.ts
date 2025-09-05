import { TGenericErrorResponse } from "../interfaces/error.types";

export const handleCastError = ():TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId, Please Provide Valid ObjectID",
  };
};