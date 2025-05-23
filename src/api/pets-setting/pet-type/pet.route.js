import express from "express";
import { searchList, createNew, deleteController, update } from "./pet-type.controller";

const router = express.Router();

router.post("/pets/get-all", searchList);
router.post("/pets/create", createNew);
router.delete('/pets/delete', deleteController)
router.patch('/pets/update', update)
export default router;
