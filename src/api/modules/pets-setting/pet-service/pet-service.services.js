import PetServiceModel from "./pet-service.schema.js";
import PetTypeModel from "../pet-type/pet-type.schema.js";
import PetServicePriceModel from "../service-price/service-price.schema.js";
import mongoose from "mongoose";

const createPetService = async (data) => {
  try {
    const { name, description, status, pet_type_ids } = data;

    if (
      pet_type_ids &&
      Array.isArray(pet_type_ids) &&
      pet_type_ids.length > 0
    ) {
      const validTargets = await PetTypeModel.find({
        _id: { $in: pet_type_ids.map((id) => new mongoose.Types.ObjectId(id)) },
      });

      if (validTargets.length !== pet_type_ids.length) {
        throw new Error("One or more pet_type_ids are invalid or do not exist");
      }
    }

    const newPetService = new PetServiceModel({
      name,
      description,
      status: status !== undefined ? status : true,
      pet_type_ids: pet_type_ids || [],
    });

    const savedPetService = await newPetService.save();

    const populatedPetService = await PetServiceModel.findById(
      savedPetService._id
    ).populate("pet_type_ids");

    return populatedPetService;
  } catch (error) {
    throw new Error(`Failed to create PetService: ${error.message}`);
  }
};

// export const updatePetService = async (id, data) => {
//   try {
//     // if (
//     //   pet_type_ids &&
//     //   Array.isArray(pet_type_ids) &&
//     //   pet_type_ids.length > 0
//     // ) {
//     //   const validTargets = await PetTypeModel.find({
//     //     _id: { $in: pet_type_ids.map((id) => new mongoose.Types.ObjectId(id)) },
//     //   });

//     //   if (validTargets.length !== pet_type_ids.length) {
//     //     throw new Error("One or more pet_type_ids are invalid or do not exist");
//     //   }
//     // }

//     // const updateData = {
//     //  ...data,
//     //   pet_type_ids: pet_type_ids || [],
//     // };

//     const updatedPetService = await PetServiceModel.findByIdAndUpdate(
//       data?.id,
//       { $set: data },
//       { new: true, runValidators: true }
//     );

//     if (!updatedPetService) {
//       throw new Error("PetService not found");
//     }

//     const populatedPetService = await PetServiceModel.findById(
//       updatedPetService._id
//     ).populate("pet_type_ids");

//     return populatedPetService;
//   } catch (error) {
//     throw new Error(`Failed to update PetService: ${error.message}`);
//   }
// };
export const updatePetService = async (payload) => {
  if (!mongoose.Types.ObjectId.isValid(payload.id)) {
    throw new Error("ID không hợp lệ");
  }



  const updatedPet = await PetServiceModel.findByIdAndUpdate(
    payload.id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedPet) {
    throw new Error("Không tìm thấy pet type với ID này");
  }

  return updatedPet;
};

export const getAll = async (payload) => {
  const {
    page = 1,
    page_size = 10,
    search_text = "",
    pet_type_ids = [],
    id,
  } = payload;

  const query = {};
  if (id) {
    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
      query._id = new ObjectId(id);
    }
  }

  if (search_text) {
    query.$or = [
      { "name.vi": { $regex: search_text, $options: "i" } },
      { "name.en": { $regex: search_text, $options: "i" } },
    ];
  }

  if (Array.isArray(pet_type_ids) && pet_type_ids.length > 0) {
    query.pet_type_ids = { $all: pet_type_ids };
  }

  const options = {
    page: parseInt(page.toString(), 10),
    limit: parseInt(page_size.toString(), 10),
    lean: true,
    sort: { createdAt: -1 },
  };

  const result = await PetServiceModel.paginate(query, options);

  const dataWithPetTypes = await Promise.all(
    result.docs.map(async (doc) => {
      const petTypes = await PetTypeModel.find(
        { _id: { $in: doc.pet_type_ids } },
        "name status icon id _id"
      ).lean();

      return {
        ...doc,
        pet_types_info: petTypes,
      };
    })
  );

  return {
    data: dataWithPetTypes,
    totalRecord: result.totalDocs,
  };
};

export const getDetailService = async (payload) => {
  const { id } = payload;

  const service = await PetServiceModel.findById(id).lean();

  if (!service) return null;

  const petTypes = await PetTypeModel.find(
    { _id: { $in: service.pet_type_ids } },
    "name status icon id _id"
  ).lean();

  return {
    ...service,
    pet_types_info: petTypes,
  };
};

const deletePetService = async (serviceId) => {
  try {
    const priceRecord = await PetServicePriceModel.findOne({
      service_id: serviceId,
    });

    if (priceRecord) {
      throw new Error(
        "Không thể xóa dịch vụ này vì nó đang được tham chiếu trong các bản ghi giá."
      );
    }

    const deletedService = await PetServiceModel.findByIdAndDelete(serviceId);

    if (!deletedService) {
      throw new Error("Không tìm thấy dịch vụ.");
    }

    return {
      success: true,
      message: "Xóa dịch vụ thành công.",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createPetService,
  getAll,
  getDetailService,
  deletePetService,
  updatePetService,
};
