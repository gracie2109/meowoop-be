import express, { Router } from "express";
import PetsRouter from "../modules/pets-setting/pet.route.js";
import DashboardRouter from "../modules/dashboard/dashboard.route.js";
import AssetRouter from "../modules/assets/asset.routes.js";
import AddressRoute from "../modules/address/address.route.js";
import UserRouter from "../modules/user/user.route.js";
import AuthRouter from "../modules/auth/auth.route.js";
import BossRouter from "../modules/boss/boss.routes.js";
import EmployeeRouter from "../modules/employee/employee.route.js";
import PetHealthRouter from "../modules/pet-health/pet-health.route.js";
import WorkingSceheduleRouter from "../modules/working-schedule/working-schedule.route.js";
import PermissionRouter from "../modules/resource-permission/permission.route.js";
import  IAMRoleRouter from "../modules/iam/roles-group/roles-group.route.js"

const rootRouters = [
  PetsRouter,
  DashboardRouter,
  AssetRouter,
  AddressRoute,
  UserRouter,
  AuthRouter,
  BossRouter,
  EmployeeRouter,
  PetHealthRouter,
  WorkingSceheduleRouter,
  PermissionRouter,
  IAMRoleRouter
];

const router = express.Router();


rootRouters.forEach((route) => {
  router.use(route);
});

export default router;
