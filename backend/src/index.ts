import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { PrismaClient, User, Role } from "@prisma/client";
const prisma = new PrismaClient();

import { authRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to private social media app!");
});

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
