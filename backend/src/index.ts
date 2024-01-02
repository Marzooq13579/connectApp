import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("welcome to private social media app!");
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, role, name } = req.body;

    const createdUser: User = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: role || "USER",
      },
    });

    res.status(201).json(createdUser);
  } catch (err) {
    console.error("Error Registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
