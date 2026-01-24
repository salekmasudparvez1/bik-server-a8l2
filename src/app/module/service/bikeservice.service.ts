import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApiErrors.js";
import { prisma } from "../../../shared/prisma.js";

const createBikeServiceFunc = async (data: { bikeId: string, serviceDate: string, description: string, status: "PENDING" | "IN_PROGRESS" | "DONE" }) => {
    if (!data?.bikeId) throw new AppError(StatusCodes.NOT_FOUND, "Bike Id not found");
    if (!data?.serviceDate) throw new AppError(StatusCodes.BAD_REQUEST, "Service date is required");
    if (!data?.description) throw new AppError(StatusCodes.BAD_REQUEST, "Description is required");
    if (!data?.status) throw new AppError(StatusCodes.BAD_REQUEST, "Status is required");
    const isExitBike = await prisma.bike.findUnique({
        where: {
            bikeId: data?.bikeId
        }
    });
    if (!isExitBike) throw new AppError(StatusCodes.NOT_FOUND, "Bike not found");
    const res = await prisma.serviceRecord.create({ data });
    return {
        data: res
    }
}
const getAllBikeServicesFunc = async () => {
    const res = await prisma.serviceRecord.findMany();
    return {
        data: res || []
    }
};
const getBikeServiceByIdFunc = async (id: string) => {
    if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found")
    const res = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    });
    if (!res) throw new AppError(StatusCodes.NOT_FOUND, "Service record not found")
    return {
        data: res
    }
};
const getAllBikeServiceOverdueFunc = async () => {
  const res = await prisma.serviceRecord.findMany({
    where: {
      status: { in: ["PENDING", "IN_PROGRESS"] } 
    }
  });

  return {
    data: res
  };
};

const addComplitionDateFunc = async (id: string, completionDate: string) => {
    if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found");
    const isExitServiceRecord = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    });

    if (!isExitServiceRecord) throw new AppError(StatusCodes.NOT_FOUND, "Service record not found");
    let finalDate = null;
    if (!completionDate) {
        finalDate = new Date().toISOString()
    };
    if (completionDate) {
        finalDate = completionDate
    }


    const response = await prisma.serviceRecord.update({
        where: {
            serviceId: id
        },
        data: {
            completionDate: finalDate
        }
    });
    return {
        data: response
    }
}
export const BikeService = {
    createBikeServiceFunc,
    getAllBikeServicesFunc,
    getBikeServiceByIdFunc,
    addComplitionDateFunc,
    getAllBikeServiceOverdueFunc
}