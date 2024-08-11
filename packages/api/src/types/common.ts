import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export interface Context {
  req: Request;
  res: Response;
  next: NextFunction;
}
