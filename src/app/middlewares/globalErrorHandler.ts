import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../prisma/generated/client/client.js";
import { ZodError } from "zod";
import HandleZodErrror from "../errors/handleZodError.js";
import { TErrorSources } from "../type/Error.js";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
     let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
    let error = err;
 
    if (err instanceof Prisma.PrismaClientValidationError) {
        message = 'Validation Error';
        error = err.message
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = "Duplicate Key error";
            error = err.meta;
        }
    } else if (err instanceof ZodError) {
        const simplifiedError = HandleZodErrror(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    res.status(statusCode).json({
        success,
        message,
        error
    })

};
export default globalErrorHandler;