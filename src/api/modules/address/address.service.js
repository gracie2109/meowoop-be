import mongoose from "mongoose";
import AddressModel from "./address.schema.js";
import createHttpError from "http-errors";
import { getGHNProvice, getGHNDistric, getGHNDWard } from "./services";
import { LOGISTIC_COMP_KEY } from "../../../constants/logistics/index";
import { AddressLevel, tranformAddressProvider } from "./utils";
import { getOrSetCache } from "../../../helpers/redisCache";
import { REDIS_KEYS, TTL_FOREVER } from "../../../constants/redis";

//  get list address, district, ward
export async function getProvider(logisticKey) {
  try {
    if (!logisticKey) {
      throw new Error("Cần thêm thông tin đơn vị vận chuyển");
    }

    if (logisticKey === LOGISTIC_COMP_KEY.GHN) {
      const key = REDIS_KEYS().GHN_PROVIDERS;

      const data = await getOrSetCache(key, TTL_FOREVER, async () => {
        const raw = await getGHNProvice();
        return tranformAddressProvider(raw, AddressLevel.LEVEL_1);
      });
      return data;
    }

    throw new Error(`Đơn vị vận chuyển không được hỗ trợ: ${logisticKey}`);
  } catch (error) {
    console.error("Error in getProvider:", error);
    throw error; // Re-throw để caller có thể xử lý
  }
}

export async function getDistric(logicticKey, providerId) {
  try {
    if (!logicticKey || !providerId) {
      throw new Error("Cần thêm thông tin đơn vị vận chuyển");
    }

    if (logicticKey === LOGISTIC_COMP_KEY.GHN) {
      const key = REDIS_KEYS(providerId).GHN_DISTRICT;

      return await getOrSetCache(key, TTL_FOREVER, async () => {
        const raw = await getGHNDistric(providerId);
        const res = raw?.filter((i) => i?.ProvinceID === +providerId);
        return tranformAddressProvider(res, AddressLevel.LEVEL_2);
      });
    }
  } catch (error) {}
}

export async function getWard(logicticKey, districId) {
  try {
    if (!logicticKey || !districId) {
      throw new Error("Cần thêm thông tin đơn vị vận chuyển");
    }

    if (logicticKey === LOGISTIC_COMP_KEY.GHN) {
      const key = REDIS_KEYS(districId).GHN_WARDS;

      return await getOrSetCache(key, TTL_FOREVER, async () => {
        const raw = await getGHNDWard(districId);
        const res = raw?.filter((i) => i?.DistrictID === +districId);
        return tranformAddressProvider(res, AddressLevel.LEVEL_3);
      });
    }
  } catch (error) {}
}

// user address

export async function createUserAddress(payload) {
  const { userId, customerId } = payload;

  // Accept both userId and customerId for flexibility
  const actualCustomerId = customerId || userId;

  if (!actualCustomerId) {
    throw createHttpError.Conflict("Thiếu userId hoặc customerId");
  }

  const data = {
    customerId: actualCustomerId,
    ...payload,
  };

  // Remove duplicate fields
  delete data.userId;
  delete data.customerId;
  data.customerId = actualCustomerId;

  const newData = await AddressModel.create(data);

  return newData.toObject();
}

export const searchAddress = async (payload) => {
  const { customerId, id, page = 1, page_size = 10 } = payload;
  const matchStage = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    matchStage._id = new mongoose.Types.ObjectId(id);
  }

  if (customerId && mongoose.Types.ObjectId.isValid(customerId)) {
    matchStage.customerId = new mongoose.Types.ObjectId(customerId);
  }

  const pageNum = parseInt(page.toString(), 10);
  const limitNum = parseInt(page_size.toString(), 10);
  const skip = (pageNum - 1) * limitNum;

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customer_info",
        pipeline: [{ $project: { name: 1, phone_number: 1 } }],
      },
    },
    {
      $addFields: {
        customer_info: { $arrayElemAt: ["$customer_info", 0] },
      },
    },
    {
      $project: {
        customerId: 0,
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limitNum }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const [result] = await AddressModel.aggregate(pipeline);
  const totalRecord = result.totalCount[0]?.count || 0;

  return {
    data: result.data,
    totalRecord: totalRecord,
  };
};

export const deleteUserAddress = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError.BadRequest("ID địa chỉ không hợp lệ");
  }

  // Check if address exists
  const existingAddress = await AddressModel.findById(id);

  if (!existingAddress) {
    throw createHttpError.NotFound("Không tìm thấy địa chỉ");
  }

  // Delete the address
  const deletedAddress = await AddressModel.findByIdAndDelete(id);

  return {
    message: "Xóa địa chỉ thành công",
  };
};

export const updateUserAddress = async (payload) => {
  const { id, new_primary, old_primary, ...updateData } = payload;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError.BadRequest("ID địa chỉ không hợp lệ");
  }

  const existingAddress = await AddressModel.findById(id);
  if (!existingAddress) {
    throw createHttpError.NotFound("Không tìm thấy địa chỉ");
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await AddressModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { session, new: true }
      );

      if (new_primary && old_primary) {
        if (
          !mongoose.Types.ObjectId.isValid(new_primary) ||
          !mongoose.Types.ObjectId.isValid(old_primary)
        ) {
          throw createHttpError.BadRequest(
            "new_primary hoặc old_primary không hợp lệ"
          );
        }

        const oldPrimaryAddress = await AddressModel.findById(old_primary);
        if (oldPrimaryAddress) {
          await AddressModel.findByIdAndUpdate(
            old_primary,
            { $set: { is_primary: false } },
            { session }
          );
        }

        const newPrimaryAddress = await AddressModel.findById(new_primary);
        if (newPrimaryAddress) {
          await AddressModel.findByIdAndUpdate(
            new_primary,
            { $set: { is_primary: true } },
            { session }
          );
        } else {
          throw createHttpError.NotFound("Không tìm thấy địa chỉ new_primary");
        }
      }
    });

    const updatedAddress = await AddressModel.findById(id);

    return {
      message: "Cập nhật địa chỉ thành công",
    };
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};
