import express from "express";
import * as PetType from "./pet-type/pet-type.controller";
import * as PetCategory from "./pet-category/pet-category.controllers";

const router = express.Router();

router.post("/pets/get-all", PetType.searchList);
router.post("/pets/create", PetType.createNew);
router.delete("/pets/delete", PetType.deleteController);
router.patch("/pets/update", PetType.update);

router.post("/pet-category/get-all", PetCategory.searchList);
router.post("/pet-category/create", PetCategory.createNew);
router.delete("/pet-category/delete", PetCategory.deleteController);
router.patch("/pet-category/update", PetCategory.update);
export default router;
