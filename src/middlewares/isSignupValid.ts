import { NextFunction, Request, Response } from "express";
import { validateSignup } from "../utils/validators";

export const bodyValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const valid = validateSignup.validate({ email, password });
  if (valid.error) {
    return res.status(400).json(valid.error);
  }

  next();
};
