import express, { Router } from "express";
import PetsRouter from "../modules/pets-setting/pet.route";
import DashboardRouter from "../modules/dashboard/dashboard.route";
import AssetRouter from "../modules/assets/asset.routes";
import AddressRoute from "../modules/address/address.route";
import UserRouter from "../modules/user/user.route";
import BossRouter from "../modules/boss/boss.routes";
import EmployeeRouter from "../modules/employee/employee.route";
import PetHealthRouter from "../modules/pet-health/pet-health.route";
import WorkingSceheduleRouter from "../modules/working-schedule/working-schedule.route";
import PermissionRouter from "../modules/resource-permission/permission.route";
import  IAMRoleRouter from "../modules/iam/roles-group/roles-group.route"

const rootRouters = [
  PetsRouter,
  DashboardRouter,
  AssetRouter,
  AddressRoute,
  // UserRouter,
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
