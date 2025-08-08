import express from "express";
import * as Controllers from "./permission.controller";
import { ROUTER_PREFIX } from "../../../constants/routePrefix";

const router = express.Router();
router.post(
  `/${ROUTER_PREFIX.RESOURCE}/create`,
  Controllers.upsertResourceAndPermissionController
);

router.post(
  `/${ROUTER_PREFIX.RESOURCE}/get-detail`,
  Controllers.getResourceDetailCtl
);
router.post(`/${ROUTER_PREFIX.RESOURCE}/search`, Controllers.getListResource);

export default router;
