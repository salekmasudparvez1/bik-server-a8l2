import catchAsync from "../../../shared/catchAsync";
import { customerService } from "./customer.service";
const createCustomer = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await customerService.createCustomerFunc(data);
    // sendResponse(res, {
    //     statusCode: StatusCodes.CREATED,
    //     success: true,
    //     message: "Customer created successfully",
    //     data: result?.data
    // })
});
export const customerController = {
    createCustomer
};
