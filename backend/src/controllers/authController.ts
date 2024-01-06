import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PrismaClient, User, Role } from "@prisma/client";
const prisma = new PrismaClient();

import { UserResponse } from "../types";

import { generateAccessToken, generateRefreshToken } from "../utils";

//Register Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, name } = req.body;

    const existingUser: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser: User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "USER",
      },
    });

    const userResponse: UserResponse = {
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
    };

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Error Registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    //GenerateAccessToken
    const accessToken = generateAccessToken(user.id, user.role);

    //GenerateRefreshToken
    const refreshToken = generateRefreshToken(user.id, user.role);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      path: "/",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//RefreshToken Controller to generate new AccessToken
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const newAccessToken = generateAccessToken(user.id, user.role);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error during token refresh:", err);
    res.status(500).json({ error: "Internal Server Error, Please Login Again!" });
  }
};

//Logout Controller
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", { path: "/" });

    const userId = req.user?.id;

    if (userId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: null,
        },
      });
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
