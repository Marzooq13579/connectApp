import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PrismaClient, User, Role } from "@prisma/client";
const prisma = new PrismaClient();

import { UserResponse } from "../types";


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
export const login = async(req:Request,res:Response) =>{
    
}