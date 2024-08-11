import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { BadRequestError, NotFoundError } from "./http-errors";
import { env } from "src/config/env";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "./statuses";

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const isDevelopment = env.NODE_ENV === "development";

  if (error instanceof ZodError) {
    res.status(BAD_REQUEST).send({
      message: "Validation error",
      statusCode: BAD_REQUEST,
      errors: error.flatten().fieldErrors,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  if (error instanceof BadRequestError) {
    res.status(BAD_REQUEST).send({
      message: error.message,
      statusCode: BAD_REQUEST,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  if (error instanceof NotFoundError) {
    res.status(NOT_FOUND).send({
      message: error.message,
      statusCode: NOT_FOUND,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    message: "Internal server error",
    statusCode: INTERNAL_SERVER_ERROR,
    ...(isDevelopment && { stack: error.stack }),
  });
}
