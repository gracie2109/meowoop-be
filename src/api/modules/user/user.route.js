import express from "express";
import passport from "passport";
import { authenticateJWT } from "../../middleware/auth.middleware";
import {
  register,
  login,
  googleCallback,
  refreshToken,
  logoutUser,
  logoutAll,
  getCurrentUser
} from "./user.controller";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  googleCallback
);

// Protected routes
router.use(authenticateJWT); 

router.get("/me", getCurrentUser);
router.post("/logout", logoutUser);
router.post("/logout-all", logoutAll);

export default router;
