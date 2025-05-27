import express from "express";
import * as DashboardControl from "./dashboard.controller";

const PREFIX = "dashboard";

const router = express.Router();
router.post(`/${PREFIX}/get-all`, DashboardControl.searchList);
router.post(`/${PREFIX}/create`, DashboardControl.createNew);
router.delete(`/${PREFIX}/delete`, DashboardControl.deleteController);
router.patch(`/${PREFIX}/update`, DashboardControl.update);

export default router;
