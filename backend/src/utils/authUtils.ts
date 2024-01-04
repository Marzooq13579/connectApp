import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, accessTokenSecret as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, refreshTokenSecret as string, {
    expiresIn: "7d",
  });
};
