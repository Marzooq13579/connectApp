import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserPayload } from "../types";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

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
    if (err || typeof decodedToken === "string") {
      return res.status(403).json({ error: "Forbidden - Invalid Token" });
    }

    const userPayload = decodedToken as UserPayload;

    req.user = userPayload;

    next();
  });
};

export const authenticateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized! Missing Refresh Token" });
  }

  jwt.verify(
    refreshToken,
    refreshTokenSecret,
    (
      err: jwt.VerifyErrors | null,
      decodedToken: string | jwt.JwtPayload | undefined
    ) => {
      if (err || typeof decodedToken === "string") {
        return res.status(403).json({ error: "Forbidden - Invalid Token. Please Login Again!" });
      }

      const userPayload = decodedToken as UserPayload;

      req.user = userPayload;

      next();
    }
  );
};
