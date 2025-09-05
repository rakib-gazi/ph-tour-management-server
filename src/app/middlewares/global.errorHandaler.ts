/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVariable, envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import mongoose from "mongoose";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleCastError } from "../helpers/handleCastError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";






// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
 if(envVariable.NODE_ENV === "development"){
     console.log(err);
 }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errorSources: any = [];
  let statusCode = 500;
  let message = `Something went Wrong!! `;

  // Duplicate Error
  if (err.code === 11000) {
    // const matchedArray = err.message.match(/"([^"]*)"/);
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // MongoDB Object iD or cast error
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    // statusCode = 400;
    // message = "Invalid MongoDB ObjectId, Please Provide Valid ObjectID";
  }

  //   zod error
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    // statusCode = 400;
    // message = "Zod Error";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // err.issues.forEach((issue: any) => {
    //   errorSources.push({
    //     path: issue.path[issue.path.length - 1],
    //     message: issue.message,
    //   });
    // });
  }
  //   mongoogse validation error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    // statusCode = 400;
    // const errors = Object.values(err.errors);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // errors.forEach((errorObject: any) =>
    //   errorSources.push({
    //     path: errorObject.path,
    //     message: errorObject.message,
    //   })
    // );
    message = simplifiedError.message;
  }
  // custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  // Error response
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    err: envVariable.NODE_ENV === "development" ? err : null,
    stack: envVariable.NODE_ENV === "development" ? err.stack : null,
  });
};
