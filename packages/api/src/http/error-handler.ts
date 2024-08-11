import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  BAD_REQUEST,
  BadRequestError,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  NotFoundError,
} from "./routes/_errors/http-errors";
import { env } from "src/config/env";

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const isDevelopment = env.NODE_ENV === "development";

  if (error instanceof ZodError) {
    return res.status(BAD_REQUEST).send({
      message: "Validation error",
      statusCode: BAD_REQUEST,
      errors: error.flatten().fieldErrors,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(BAD_REQUEST).send({
      message: error.message,
      statusCode: BAD_REQUEST,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(NOT_FOUND).send({
      message: error.message,
      statusCode: NOT_FOUND,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).send({
    message: "Internal server error",
    statusCode: INTERNAL_SERVER_ERROR,
    ...(isDevelopment && { stack: error.stack }),
  });
}
