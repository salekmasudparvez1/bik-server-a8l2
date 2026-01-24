const handleZodError = (err) => {
    let zodMessage = '';
    const errorSources = err.issues.map((issue) => {
        const lastPathSegment = issue.path[issue.path.length - 1];
        const normalizedPath = typeof lastPathSegment === 'string' || typeof lastPathSegment === 'number'
            ? lastPathSegment
            : '';
        zodMessage = issue.message;
        return {
            // Ensure path is always string | number for our error contract
            path: normalizedPath,
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: zodMessage || 'Validation Error',
        errorSources,
    };
};
export default handleZodError;
