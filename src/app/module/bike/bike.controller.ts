import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { BikeService } from "./bike.service.js";
import sendResponse from "../../../shared/sendResponse.js";



const createBike = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body;
    const result = await BikeService.createBikeFunc(data);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"Bike added successfully",
        data:result?.data
    })
})
const getAllBikes = catchAsync(async(req:Request,res:Response)=>{
   
    const result = await BikeService.getAllBikesFunc();
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Bikes fetched successfully",
        data:result?.data
    })
});
const getBikeById = catchAsync(async(req:Request,res:Response)=>{
    const id = req.params.id as string;
    const result = await BikeService.getBikeByIdFunc(id);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Bike fetched successfully",
        data:result?.data
    })
});

export const BikeController = {
    createBike,
    getAllBikes,
    getBikeById
}