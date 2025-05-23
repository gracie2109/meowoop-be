import express, { Router } from "express";
import PetsRouter from "../pets-setting/pet-type/pet.route";

const rootRouters = [PetsRouter];

const router = express.Router();

rootRouters.forEach((route) => {
  router.use(route);
});

export default router;
