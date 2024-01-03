import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { PrismaClient, User,Role } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("welcome to private social media app!");
});

interface UserResponse {
  email: string;
  name: string | null;
  role: Role;
}

app.post("/register", async (req: Request, res: Response) => {
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
    const hashedPassword = await bcrypt.hash(password,saltRounds)



    const createdUser: User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "USER",
      }
    });

    const userResponse : UserResponse = {
      email : createdUser.email,
      name : createdUser.name,
      role: createdUser.role
    }

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Error Registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
