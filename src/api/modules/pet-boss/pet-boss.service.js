import mongoose from "mongoose";
import PetBossModel from "./pet-boss.schema.js";
import Appointment from "../pet-health/appointment/appointment.schema.js";

export const searchPetBoss = async (payload) => {
  const {
    owner_id,
    id,
    search_text,
    page = 1,
    page_size = 25,
    searchOwner = true,
    animal_type,
  } = payload;

  const matchStage = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    matchStage._id = new mongoose.Types.ObjectId(id);
  }

  if (owner_id && mongoose.Types.ObjectId.isValid(owner_id)) {
    matchStage.owner_id = new mongoose.Types.ObjectId(owner_id);
  }

  const pageNum = parseInt(page.toString(), 10);
  const limitNum = parseInt(page_size.toString(), 10);
  const skip = Math.max(0, (pageNum - 1) * limitNum);

  let pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "owner_id",
        foreignField: "_id",
        as: "owner_info",
        pipeline: [{ $project: { name: 1, phone_number: 1 } }],
      },
    },
    {
      $lookup: {
        from: "pets",
        localField: "animal_type",
        foreignField: "_id",
        as: "animal_type_info",
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      $addFields: {
        owner_info: { $arrayElemAt: ["$owner_info", 0] },
        animal_type_info: { $arrayElemAt: ["$animal_type_info", 0] },
      },
    },
  ];

  if (search_text && search_text.trim() !== "") {
    const searchConditions = [
      { name: { $regex: search_text.trim(), $options: "i" } },
      { full_name: { $regex: search_text.trim(), $options: "i" } },
    ];

    if (searchOwner) {
      searchConditions.push({
        "owner_info.name": { $regex: search_text.trim(), $options: "i" },
      });
    }

    searchConditions.push({
      "animal_type_info.name": { $regex: search_text.trim(), $options: "i" },
    });

    pipeline.push({
      $match: {
        $or: searchConditions,
      },
    });
  }

  if (animal_type && mongoose.Types.ObjectId.isValid(animal_type)) {
    pipeline.splice(1, 0, {
      $match: {
        animal_type: new mongoose.Types.ObjectId(animal_type),
      },
    });
  }
  pipeline.push(
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limitNum }],
        totalCount: [{ $count: "count" }],
      },
    }
  );

  const [result] = await PetBossModel.aggregate(pipeline);
  const totalRecord = result.totalCount[0]?.count || 0;

  return {
    data: result.data,
    totalRecord: totalRecord,
  };
};

export const createBoss = async (payload) => {
  // Validate required fields
  const errors = [];
  if (!payload.name || typeof payload.name !== "string") {
    errors.push("Tên boss là bắt buộc và phải là chuỗi.");
  }
  if (!payload.owner_id || !mongoose.Types.ObjectId.isValid(payload.owner_id)) {
    errors.push("owner_id là bắt buộc và phải là ObjectId hợp lệ.");
  }
  if (
    !payload.animal_type ||
    !mongoose.Types.ObjectId.isValid(payload.animal_type)
  ) {
    errors.push("animal_type là bắt buộc và phải là ObjectId hợp lệ.");
  }
  // Có thể bổ sung validate cho các trường khác nếu cần

  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.status = 400;
    throw error;
  }

  try {
    const boss = await PetBossModel.create(payload);
    return boss;
  } catch (error) {
    throw error;
  }
};

export const deleteBoss = async (payload) => {
  const { id } = payload;

  // Validate input
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("ID boss không hợp lệ.");
    error.status = 400;
    throw error;
  }

  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const [bossExists, appointmentExists] = await Promise.all([
      PetBossModel.exists({ _id: objectId }),
      Appointment.exists({ pet_id: objectId }),
    ]);

    // Kiểm tra boss có tồn tại không
    if (!bossExists) {
      const error = new Error("Boss không tồn tại.");
      error.status = 404;
      throw error;
    }

    // Kiểm tra boss có appointment nào không
    if (appointmentExists) {
      const error = new Error(
        "Không thể xóa boss này vì đã có lịch hẹn liên quan."
      );
      error.status = 400;
      throw error;
    }

    // Thực hiện xóa boss và trả về document đã xóa
    const deletedBoss = await PetBossModel.findByIdAndDelete(objectId);
    return deletedBoss;
  } catch (error) {
    throw error;
  }
};
