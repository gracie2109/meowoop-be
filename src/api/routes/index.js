import express, { Router } from "express";
import PetsRouter from "../modules/pets-setting/pet.route";
import DashboardRouter from "../modules/dashboard/dashboard.route";
import AssetRouter from "../modules/assets/asset.routes";

const rootRouters = [PetsRouter, DashboardRouter, AssetRouter];

const router = express.Router();

rootRouters.forEach((route) => {
  router.use(route);
});

export default router;
