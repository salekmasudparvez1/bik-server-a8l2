import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bikeservice.service";


const createBikeService = catchAsync(async(req,res)=>{
    const data = req.body;
    const result = await BikeService.createBikeServiceFunc(data);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"Bike service record created successfully",
        data:result?.data
    })
});

const getAllBikeServices = catchAsync(async(req,res)=>{
    const result = await BikeService.getAllBikeServicesFunc();
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Service records fetched successfully",
        data:result?.data
    })
});
const getBikeServiceById = catchAsync(async(req,res)=>{
    const id = req.params.id as string;
    const result = await BikeService.getBikeServiceByIdFunc(id);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Service record fetched successfully",
        data:result?.data
    })
});
const getAllBikeServiceOverdue = catchAsync(async(req,res)=>{
    const result = await BikeService.getAllBikeServiceOverdueFunc();
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Overdue or pending services fetched successfully",
        data:result?.data
    })
})
const addCompletionDate = catchAsync(async(req,res)=>{
    const id = req.params.id as string;
    const { completionDate } = req.body;
    const result = await BikeService.addComplitionDateFunc(id, completionDate);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Service marked as completed",
        data:result?.data
    })
});
export const BikeServiceController = {
    createBikeService,
    getAllBikeServices,
    getBikeServiceById,
    addCompletionDate,
    getAllBikeServiceOverdue
}