import express from "express";
import * as DashboardControl from "./dashboard.controller";
import { ROUTER_PREFIX } from "../../constants/routePrefix";


const router = express.Router();
router.post(`/${ROUTER_PREFIX.DASHBOARD}/get-all`, DashboardControl.searchList);
router.post(`/${ROUTER_PREFIX.DASHBOARD}/create`, DashboardControl.createNew);
router.delete(`/${ROUTER_PREFIX.DASHBOARD}/delete`, DashboardControl.deleteController);
router.patch(`/${ROUTER_PREFIX.DASHBOARD}/update`, DashboardControl.update);

export default router;
