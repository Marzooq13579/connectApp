import { Request, Response, NextFunction } from "express";

export const adminDashboard = (req: Request, res: Response) => {
  res.send({ message: "Welcome to Admin Dashboard" });
};




  
