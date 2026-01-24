import { Response } from "express"



type TResponseData<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T | null | undefined

}

const sendResponse = <T>(res: Response, jsonData: TResponseData<T>) => {
    res.status(jsonData?.statusCode).json(
        {
            success: jsonData.success || "Request completed successfully",
            message: jsonData.message,
            data: jsonData?.data ?? null
        }
    )

}

export default sendResponse