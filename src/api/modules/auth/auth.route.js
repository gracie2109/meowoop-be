import express from "express";
import {
  register,
  login,
  googleAuth,
  refreshToken,
  logout,
  logoutAll,
  changeUserPassword,
} from "./auth.controller.js";
import { authenticateJWT } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/google/callback", googleAuth);

// Protected routes
// router.use(authenticateJWT);
router.post("/logout", logout);
router.post("/logout-all", logoutAll);
router.post("/change-password", changeUserPassword);

export default router;
