import PetServiceModel from "./pet-service.schema.js"; 
import PetTypeModel from "../pet-type/pet-type.schema.js";
import mongoose from "mongoose";

const createPetService = async (data) => {
  try {
    const { name, description, status, target_ids } = data;

    if (target_ids && Array.isArray(target_ids) && target_ids.length > 0) {
      const validTargets = await PetTypeModel.find({
        _id: { $in: target_ids.map(id => new mongoose.Types.ObjectId(id)) },
      });

      if (validTargets.length !== target_ids.length) {
        throw new Error("One or more target_ids are invalid or do not exist");
      }
    }

    const newPetService = new PetServiceModel({
      name,
      description,
      status: status !== undefined ? status : true, 
      target_ids: target_ids || [],
    });

    const savedPetService = await newPetService.save();

    const populatedPetService = await PetServiceModel.findById(savedPetService._id).populate("target_ids");

    return populatedPetService;
  } catch (error) {
    throw new Error(`Failed to create PetService: ${error.message}`);
  }
};

export default { createPetService };

