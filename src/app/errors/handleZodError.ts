import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../type/Error.js';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  let zodMessage = '';

  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    const lastPathSegment = issue.path[issue.path.length - 1];
    const normalizedPath = typeof lastPathSegment === 'string' || typeof lastPathSegment === 'number'
        ? lastPathSegment
        : '';
        zodMessage=issue.message
    return {
      // Ensure path is always string | number for our error contract
      path: normalizedPath,
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message:zodMessage || 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
