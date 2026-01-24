import { StatusCodes } from "http-status-codes"
import { TCreateCustomerBody } from "./customer.interface.js";
import { AppError } from "../../errors/ApiErrors.js";
import { prisma } from "../../../shared/prisma.js";


const createCustomerFunc = async (data: TCreateCustomerBody) => {

  if (!data?.name) throw new AppError(StatusCodes.BAD_REQUEST, "Name is required");
  if (!data?.email) throw new AppError(StatusCodes.BAD_REQUEST, "Email is required");
  if (!data?.phone) throw new AppError(StatusCodes.BAD_REQUEST, "Phone is required");
  const isExistEmail = await prisma.customer.findUnique({
    where: {
      email: data?.email
    }
  })
  if (isExistEmail) throw new AppError(StatusCodes.CONFLICT, "Email is already exist")
  const res = await prisma.customer.create({ data });


  return {
    data: res
  }
}
const getCustomersFunc = async () => {
  const res = await prisma.customer.findMany()
  return {
    data: res || []
  }
}
const getCustomerByIdFunc = async (id: string) => {
  if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found")
  const res = await prisma.customer.findUnique({
    where: {
      customerId: id
    }
  });
  if (!res) throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  return {
    data: res
  }
}
interface TUpdateDoc { name?: string, phone?: string }
const updateCustomerByIdFunc = async (id: string, data: TUpdateDoc) => {
  if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found");
  const isExitUser = await prisma.customer.findUnique({
    where: {
      customerId: id
    }
  })

  if (!isExitUser) throw new AppError(StatusCodes.NOT_FOUND, "user not found");

  if (!data) throw new AppError(StatusCodes.NOT_FOUND, "Update data not found");
  const updateDoc: TUpdateDoc = {}
  if (data?.name) updateDoc.name = data?.name
  if (data?.phone) updateDoc.phone = data?.phone

  const response = await prisma.customer.update({
    where: {
      customerId: id
    },
    data: updateDoc
  });
  console.log('response___:', response);
  return {
    data: response
  }

}
const deleteCustomerByIdFunc = async (id: string) => {
  if (!id) throw new AppError(StatusCodes.NOT_FOUND, "Id not found");
  const isExitUser = await prisma.customer.findUnique({
    where: {
      customerId: id
    }
  })

  if (!isExitUser) throw new AppError(StatusCodes.NOT_FOUND, "user not found");
  const res = await prisma.customer.delete({
    where: {
      customerId: id
    }
  })
  console.log(res);
  return {
    data:res
  }

}
export const customerService = {
  createCustomerFunc,
  getCustomersFunc,
  getCustomerByIdFunc,
  updateCustomerByIdFunc,
  deleteCustomerByIdFunc
}