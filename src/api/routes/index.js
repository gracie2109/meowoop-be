import express, { Router } from "express";
import PetsRouter from "../modules/pets-setting/pet.route";
import DashboardRouter from "../modules/dashboard/dashboard.route";

const rootRouters = [PetsRouter, DashboardRouter];

const router = express.Router();

rootRouters.forEach((route) => {
  router.use(route);
});

export default router;
