import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { customerService } from "./customer.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createCustomer = catchAsync(async(req: Request, res: Response) => {

    const result = await customerService.createCustomerFunc();

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Customer created successfully",
        data: result?.data
    })

})

export const customerController = {
    createCustomer
}