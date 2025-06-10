import mongoose from "mongoose";
import PetServicePriceModel from "./service-price.schema";

const createPetServicePrice = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error("dataArray must be a non-empty array");
    }

    const bulkOps = dataArray.map((data, index) => {
      if (!data.pet_id || !mongoose.Types.ObjectId.isValid(data.pet_id)) {
        throw new Error(
          `Invalid or missing pet_id at index ${index}: ${JSON.stringify(data)}`
        );
      }
      if (
        !data.service_id ||
        !mongoose.Types.ObjectId.isValid(data.service_id)
      ) {
        throw new Error(
          `Invalid or missing service_id at index ${index}: ${JSON.stringify(
            data
          )}`
        );
      }
      if (!data.weight_id || !mongoose.Types.ObjectId.isValid(data.weight_id)) {
        throw new Error(
          `Invalid or missing weight_id at index ${index}: ${JSON.stringify(
            data
          )}`
        );
      }

      const document = {
        pet_id: data.pet_id,
        service_id: data.service_id,
        weight_id: data.weight_id,
        price: data.price || null,
        duration: data.duration || null,
        updatedAt: new Date(),
      };

      return {
        updateOne: {
          filter: {
            pet_id: data.pet_id,
            service_id: data.service_id,
            weight_id: data.weight_id,
          },
          update: {
            $set: document,
            $setOnInsert: { createdAt: new Date() },
          },
          upsert: true,
        },
      };
    });

    const result = await PetServicePriceModel.bulkWrite(bulkOps, {
      ordered: false,
      writeConcern: { w: 1 },
    });

    return {
      success: true,
      insertedCount: result.upsertedCount || 0,
      modifiedCount: result.modifiedCount || 0,

      message: "Create or update completed successfully",
    };
  } catch (error) {
    console.error("Error in createOrUpdatePetServicePrices:", error);
    return {
      success: false,
      error: error.message,
      details: error.stack,
    };
  }
};
const getPetServicePriceById = async (id) => {
  if (!id) return null;
  return await PetServicePriceModel.findById(id);
};

const getPetServicePriceByPetAndService = async (pet_id, service_id) => {
  if (!pet_id || !service_id) return null;
  return await PetServicePriceModel.find({ pet_id, service_id });
};

const getPetServicePricesByPetOrService = async ({ pet_id, service_id }) => {
  const filter = {};
  if (pet_id) filter.pet_id = pet_id;
  if (service_id) filter.service_id = service_id;
  if (Object.keys(filter).length === 0) return [];

  return await PetServicePriceModel.find(filter);
};

const getPetServicePriceDetail = async ({ id, pet_id, service_id }) => {
  try {
    // Case 1
    if (id) {
      const data = await getPetServicePriceById(id);
      return data
        ? { success: true, total: data.length, data }
        : { success: false, message: "Không tìm thấy bản ghi theo _id." };
    }

    // Case 2
    if (pet_id && service_id) {
      const data = await getPetServicePriceByPetAndService(pet_id, service_id);
      return data
        ? { success: true, total: data.length, data }
        : {
            success: false,
            message: "Không tìm thấy theo pet_id và service_id.",
          };
    }

    // Case 3
    if (pet_id || service_id) {
      const list = await getPetServicePricesByPetOrService({
        pet_id,
        service_id,
      });
      return {
        success: true,
        total: list.length,
        multiple: true,
        data: list,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi máy chủ khi lấy dữ liệu.",
      error: error.message,
    };
  }
};

const updatePetServicePrices = async (updateDataArray) => {
  try {
    if (!Array.isArray(updateDataArray) || updateDataArray.length === 0) {
      throw new Error("updateDataArray must be a non-empty array");
    }

    const bulkOps = updateDataArray.map((data) => {
      if (!data._id || !mongoose.Types.ObjectId.isValid(data._id)) {
        throw new Error(
          `Invalid or missing _id in update data: ${JSON.stringify(data)}`
        );
      }

      const updateFields = {};

      if (data.pet_id && mongoose.Types.ObjectId.isValid(data.pet_id)) {
        updateFields.pet_id = data.pet_id;
      }
      if (data.service_id && mongoose.Types.ObjectId.isValid(data.service_id)) {
        updateFields.service_id = data.service_id;
      }
      if (data.weight_id && mongoose.Types.ObjectId.isValid(data.weight_id)) {
        updateFields.weight_id = data.weight_id;
      }
      if (data.price !== undefined) {
        updateFields.price = data.price;
      }
      if (data.duration !== undefined) {
        updateFields.duration = data.duration;
      }

      return {
        updateOne: {
          filter: { _id: data._id },
          update: {
            $set: {
              ...updateFields,
              updatedAt: new Date(),
            },
          },
          upsert: false,
        },
      };
    });

    const result = await PetServicePriceModel.bulkWrite(bulkOps, {
      ordered: false,
      writeConcern: { w: 1 },
    });

    return {
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      message: "Update completed successfully",
    };
  } catch (error) {
    console.error("Error in updatePetServicePrices:", error);
    return {
      success: false,
      error: error.message,
      details: error.stack,
    };
  }
};

export {
  createPetServicePrice,
  getPetServicePriceDetail,
  updatePetServicePrices,
};
