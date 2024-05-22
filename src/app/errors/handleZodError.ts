import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const errorMessages = errorDetails.map((err) => {
    return `${err.message}`;
  });

  const statusCode = 400;

  return {
    statusCode,
    message: `${errorMessages.join(" ")}`,
    errorDetails,
  };
};

export default handleZodError;
