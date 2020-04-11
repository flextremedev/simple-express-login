import { Request, Response, NextFunction } from "express";

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session?.userId) {
    console.log("Authenticated");
    next();
  } else {
    console.log("Unauthenticated");
    res.status(401).end();
  }
};
