import express from "express";
import * as Controllers from "./roles-group.controller";
import { ROUTER_PREFIX } from "../../../../constants/routePrefix";

const router = express.Router();

router.post(`/${ROUTER_PREFIX.ROLES}/get-detail`, Controllers.getRoleByIdController);
router.post(`/${ROUTER_PREFIX.ROLES}/search`, Controllers.getRolesController);
router.post(`/${ROUTER_PREFIX.ROLES}/create`, Controllers.createRoleController);
router.patch(`/${ROUTER_PREFIX.ROLES}/update/:id`, Controllers.updateRoleController);
router.delete(`/${ROUTER_PREFIX.ROLES}/:id`, Controllers.deleteRoleController);
router.get(`/${ROUTER_PREFIX.ROLES}/detail/:id`, Controllers.getRoleByIdController);

export default router;
  