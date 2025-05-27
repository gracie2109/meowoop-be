import express, { Router } from "express";
import PetsRouter from "../pets-setting/pet.route";
import DashboardRouter from "../dashboard/dashboard.route";

const rootRouters = [PetsRouter, DashboardRouter];

const router = express.Router();

rootRouters.forEach((route) => {
  router.use(route);
});

export default router;
