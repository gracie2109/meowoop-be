import mongoose from "mongoose";
import DashboardModel from "./dashboard.schema";
import createHttpError from "http-errors";

export const getAllPets = async (payload) => {
  const { page = 1, page_size = 10, search_text = "" } = payload;

  const query = {};
  if (search_text) {
    query.$or = [
      { name: { $regex: search_text, $options: "i" } },
      { uuid: { $regex: search_text, $options: "i" } },
    ];
  }

  const options = {
    page,
    limit: page_size,
    lean: true,
    sort: { createdAt: -1 },
  };

  const result = await DashboardModel.paginate(query, options);

  return {
    data: result.docs,
    totalRecord: result.totalDocs,
  };
};

export const createPetType = async (payload) => {
  const { name } = payload;

  const existed = await DashboardModel.findOne({
    $or: [{ name: name }],
  });

  if (existed) {
    throw createHttpError.Conflict("PetType với name hoặc uuid đã tồn tại.");
  }

  const newPetType = await DashboardModel.create({
    ...payload,
  });

  return newPetType.toObject();
};

export const deleteManyPets = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Danh sách ID không hợp lệ");
  }

  const invalidIds = [];
  const validObjectIds = [];

  for (const id of ids) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      validObjectIds.push(new mongoose.Types.ObjectId(id));
    } else {
      invalidIds.push(id);
    }
  }

  const existingDocs = await DashboardModel.find(
    { _id: { $in: validObjectIds } },
    { _id: 1 }
  );
  const existingIds = existingDocs.map((doc) => doc._id.toString());

  const notFoundIds = validObjectIds
    .map((oid) => oid.toString())
    .filter((id) => !existingIds.includes(id));

  const deleteResult = await DashboardModel.deleteMany({
    _id: { $in: validObjectIds },
  });

  return {
    deletedCount: deleteResult.deletedCount,
    invalidIds,
    notFoundIds,
  };
};

export const updatePetType = async (payload) => {
  if (!mongoose.Types.ObjectId.isValid(payload.id)) {
    throw new Error("ID không hợp lệ");
  }

  if (
    !payload ||
    !payload.id ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    Object.keys(payload).length === 0
  ) {
    throw new Error("Dữ liệu cập nhật không hợp lệ");
  }

  const updatedPet = await DashboardModel.findByIdAndUpdate(
    payload.id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedPet) {
    throw new Error("Không tìm thấy pet type với ID này");
  }

  return updatedPet;
};
