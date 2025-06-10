import express from "express";
import { ROUTER_PREFIX } from "../../../constants/routePrefix"
import * as PetType from "./pet-type/pet-type.controller";
import * as PetCategory from "./pet-category/pet-category.controllers";
import * as PetService from "./pet-service/pet-service.controllers"
import * as PetWeight from "./pet-weight/pet-weight.controllers"
import * as PetServicePrice from "./service-price/service-price.controllers"

const router = express.Router();

router.post(`/${ROUTER_PREFIX.PET_TYPE}/get-all`, PetType.searchList);
router.post(`/${ROUTER_PREFIX.PET_TYPE}/create`, PetType.createNew);
router.delete(`/${ROUTER_PREFIX.PET_TYPE}/delete`, PetType.deleteController);
router.patch(`/${ROUTER_PREFIX.PET_TYPE}/update`, PetType.update);

router.post(`/${ROUTER_PREFIX.PET_CATEGORY}/get-all`, PetCategory.searchList);
router.post(`/${ROUTER_PREFIX.PET_CATEGORY}/create`, PetCategory.createNew);
router.delete(`/${ROUTER_PREFIX.PET_CATEGORY}/delete`, PetCategory.deleteController);
router.patch(`/${ROUTER_PREFIX.PET_CATEGORY}/update`, PetCategory.update);

router.post(`/${ROUTER_PREFIX.PET_SERVICE}/search`, PetService.searchList);
router.post(`/${ROUTER_PREFIX.PET_SERVICE}/create-service`, PetService.createNew);
router.post(`/${ROUTER_PREFIX.PET_SERVICE}/detail-service`, PetService.getServiceDetail);
router.patch(`/${ROUTER_PREFIX.PET_SERVICE}/update-service`, PetService.updateService);


router.get(`/${ROUTER_PREFIX.PET_WEIGHT}/search`, PetWeight.searchList);
router.post(`/${ROUTER_PREFIX.PET_WEIGHT}/create`, PetWeight.createNew);

router.post(`/${ROUTER_PREFIX.SERVICE_PRICE}/create`, PetServicePrice.createNew);
router.post(`/${ROUTER_PREFIX.SERVICE_PRICE}/service-price-slip`, PetServicePrice.getDetail);


export default router;
