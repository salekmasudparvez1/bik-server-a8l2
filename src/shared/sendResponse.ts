import { Response } from "express"


type TMetaData = {
    page: number;
    limit: number;
    skip: number;
};
type TResponseData<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: TMetaData
    data: T | null | undefined

}

const sendResponse = <T>(res: Response, jsonData: TResponseData<T>) => {
    res.status(jsonData?.statusCode).json(
        {
            success: jsonData.success || "Request completed successfully",
            message: jsonData.message,
            meta: jsonData?.meta || null,
            data: jsonData?.data ?? null
        }
    )

}

export default sendResponse