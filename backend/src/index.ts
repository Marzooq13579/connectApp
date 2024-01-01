
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get("/test", (req:Request, res:Response) => {
  res.send("welcome to social media app server!");
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
