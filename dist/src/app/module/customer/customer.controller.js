import catchAsync from "../../../shared/catchAsync";
import { customerService } from "./customer.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
const createCustomer = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await customerService.createCustomerFunc(data);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Customer created successfully",
        data: result?.data
    });
});
const getCustomers = catchAsync(async (req, res) => {
    const result = await customerService.getCustomersFunc();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Customers fetched successfully",
        data: result?.data
    });
});
const getCustomerById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await customerService.getCustomerByIdFunc(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Customer fetched successfully",
        data: result?.data
    });
});
const updateCustomerById = catchAsync(async (req, res) => {
    const id = req?.params?.id;
    const updateData = req?.body;
    const result = await customerService.updateCustomerByIdFunc(id, updateData);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Customer updated successfully",
        data: result?.data
    });
});
const deleteCustomerById = catchAsync(async (req, res) => {
    const id = req?.params.id;
    const result = await customerService.deleteCustomerByIdFunc(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Customer deleted successfully",
        data: result?.data
    });
});
export const customerController = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
};
