import express from "express";
import { authenticateJWT } from "../../middleware/auth.middleware.js";
import {
  getCurrentUser,
  searchListCustomer,
  createUser
} from "./user.controller.js";
import { ROUTER_PREFIX } from "../../../constants/routePrefix.js";

const router = express.Router();

// Auth routes moved to auth.route.js

// Protected user profile routes
// router.use(authenticateJWT);

router.get("/me", getCurrentUser);
router.post(`/${ROUTER_PREFIX.USER}/search`, searchListCustomer);
router.post(`/${ROUTER_PREFIX.USER}/create`, createUser); 
export default router;
