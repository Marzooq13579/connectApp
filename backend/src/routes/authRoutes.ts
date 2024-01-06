import express from "express";
import { register, login, logout, refreshToken } from "../controllers";
import { authenticateJWT, authenticateRefreshToken } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refreshToken", authenticateRefreshToken, refreshToken);
router.post("/logout", authenticateJWT, logout);


export { router as authRoutes };
