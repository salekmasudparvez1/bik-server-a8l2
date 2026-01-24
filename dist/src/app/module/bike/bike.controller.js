import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bike.service";
const createBike = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await BikeService.createBikeFunc(data);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Bike added successfully",
        data: result?.data
    });
});
const getAllBikes = catchAsync(async (req, res) => {
    const result = await BikeService.getAllBikesFunc();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Bikes fetched successfully",
        data: result?.data
    });
});
const getBikeById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await BikeService.getBikeByIdFunc(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Bike fetched successfully",
        data: result?.data
    });
});
export const BikeController = {
    createBike,
    getAllBikes,
    getBikeById
};
