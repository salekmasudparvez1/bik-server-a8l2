import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApiErrors.js";
import { prisma } from "../../../shared/prisma.js";

const createBikeFunc = async (data: { brand: string, model: string, year: number, customerId: string }) => {
    if (!data?.customerId) throw new AppError(StatusCodes.NOT_FOUND, "Id not found");
    const isExitUser = await prisma.customer.findUnique({
        where: {
            customerId: data?.customerId
        }
    });
    if (!isExitUser) throw new AppError(StatusCodes.NOT_FOUND, "user not found");
    if (!data?.brand) throw new AppError(StatusCodes.BAD_REQUEST, "Brand is required");
    if (!data?.model) throw new AppError(StatusCodes.BAD_REQUEST, "Model is required");
    if (!data?.year) throw new AppError(StatusCodes.BAD_REQUEST, "Year is required");

    const res = await prisma.bike.create({ data })
    return {
        data:res
    }
}
const getAllBikesFunc = async () => {
    const res = await prisma.bike.findMany();
    return {
        data: res || []
    }
};
const getBikeByIdFunc = async (id: string) => {
    if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found")
    const res = await prisma.bike.findUnique({
        where: {
            bikeId: id
        }
    });
    if (!res) throw new AppError(StatusCodes.NOT_FOUND, "Bike not found")
    return {
        data: res
    }
}   


export const BikeService = {
    createBikeFunc,
    getAllBikesFunc,
    getBikeByIdFunc
}