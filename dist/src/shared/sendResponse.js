const sendResponse = (res, jsonData) => {
    res.status(jsonData?.statusCode).json({
        success: jsonData.success || "Request completed successfully",
        message: jsonData.message,
        data: jsonData?.data ?? null
    });
};
export default sendResponse;
