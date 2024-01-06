import express from "express";
import { authenticateJWT, authorizeRole } from "../middlewares";
import { adminDashboard } from "../controllers/adminController";

const router = express.Router();

router.get("/dashboard",authenticateJWT,authorizeRole("ADMIN"),adminDashboard);


export { router as adminRoutes };



  