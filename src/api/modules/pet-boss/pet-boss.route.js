import express from "express";
import * as PetBossControllder from "./pet-boss.controller";
import { ROUTER_PREFIX } from "../../../constants/routePrefix";

const router = express.Router();

router.post(
  `/${ROUTER_PREFIX.BOSS}/create`,
  PetBossControllder.createBossController
);
router.post(`/${ROUTER_PREFIX.BOSS}/search`, PetBossControllder.searchBoss);
router.delete(`/${ROUTER_PREFIX.BOSS}/:id`, PetBossControllder.deleteBossCtrl);

export default router;
