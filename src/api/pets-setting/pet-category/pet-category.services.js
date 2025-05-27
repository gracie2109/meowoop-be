import mongoose from "mongoose";
import createHttpError from "http-errors";
import PetCategoryModel from "./pet-category.schema";

export const getAll = async (payload) => {
  const { page = 1, page_size = 10, search_text = "" } = payload;

  const query = {};
  if (search_text) {
    query.$or = [
      { "name.vi": { $regex: search_text, $options: "i" } },
      { "name.en": { $regex: search_text, $options: "i" } },
    ];
  }

  const options = {
    page: parseInt(page.toString(), 10),
    limit: parseInt(page_size.toString(), 10),
    lean: true,
    sort: { createdAt: -1 },
  };

  const result = await PetCategoryModel.paginate(query, options);

  return {
    data: result.docs,
    totalRecord: result.totalDocs,
  };
};

export const createData = async (payload) => {
  const { name } = payload;

  if (!name?.vi || !name?.en) {
    throw createHttpError.BadRequest("Tên tiếng Việt và tiếng Anh là bắt buộc");
  }

  const existed = await PetCategoryModel.findOne({
    $or: [{ "name.vi": name.vi }, { "name.en": name.en }],
  });

  if (existed) {
    throw createHttpError.Conflict("Tên tiếng Việt hoặc tiếng Anh đã tồn tại");
  }

  const newPetType = await PetCategoryModel.create({
    ...payload,
  });

  return newPetType.toObject();
};

export const deleteData = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw createHttpError.BadRequest("Danh sách ID không hợp lệ");
  }

  const invalidIds = [];
  const validObjectIds= [];

  for (const id of ids) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      validObjectIds.push(new mongoose.Types.ObjectId(id));
    } else {
      invalidIds.push(id);
    }
  }

  const existingDocs = await PetCategoryModel.find(
    { _id: { $in: validObjectIds } },
    { _id: 1 }
  );
  const existingIds = existingDocs.map((doc) => doc._id.toString());

  const notFoundIds = validObjectIds
    .map((oid) => oid.toString())
    .filter((id) => !existingIds.includes(id));

  const deleteResult = await PetCategoryModel.deleteMany({
    _id: { $in: validObjectIds },
  });

  return {
    deletedCount: deleteResult.deletedCount,
    invalidIds,
    notFoundIds,
  };
};

export const updateData = async (payload) => {
  if (!mongoose.Types.ObjectId.isValid(payload.id)) {
    throw createHttpError.BadRequest("ID không hợp lệ");
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    Object.keys(payload).length === 0
  ) {
    throw createHttpError.BadRequest("Dữ liệu cập nhật không hợp lệ");
  }

  // Kiểm tra trùng lặp name.vi hoặc name.en nếu được cung cấp
  if (payload.name) {
    const { vi, en } = payload.name;
    if (!vi || !en) {
      throw createHttpError.BadRequest("Tên tiếng Việt và tiếng Anh là bắt buộc");
    }

    const existed = await PetCategoryModel.findOne({
      $or: [{ "name.vi": vi }, { "name.en": en }],
      _id: { $ne: payload.id }, // Loại trừ chính document đang cập nhật
    });

    if (existed) {
      throw createHttpError.Conflict("Tên tiếng Việt hoặc tiếng Anh đã tồn tại");
    }
  }

  const updatedPetType = await PetCategoryModel.findByIdAndUpdate(
    payload.id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedPetType) {
    throw createHttpError.NotFound("Không tìm thấy loại thú cưng với ID này");
  }

  return updatedPetType.toObject();
};