import express from "express";
import { register, login, logout } from "../controllers";
import { authenticateJWT } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout',authenticateJWT,logout);

export { router as authRoutes };
