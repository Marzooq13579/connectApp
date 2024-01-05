import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import {UserPayload} from "../types";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  jwt.verify(token, accessTokenSecret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid Token" });
    }

    const userPayload = decodedToken as UserPayload;

    req.user = userPayload;

    next();
  });
};
