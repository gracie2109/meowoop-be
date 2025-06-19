import mongoose from "mongoose";
import AddressModel from "./address.schema";
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
        return tranformAddressProvider(raw, AddressLevel.LEVEL_2);
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
        return tranformAddressProvider(raw, AddressLevel.LEVEL_3);
      });
    }
  } catch (error) {}
}

// user address

export async function createUserAddress(payload) {
  const { userId } = payload;

  if (!userId) {
    throw createHttpError.Conflict("Thiếu userId");
  }

  const data = {
    customerId: userId,
    ...payload,
  };
  const newData = await AddressModel.create(data);

  return newData.toObject();
}

export const searchAddress = async (payload) => {
  const { customerId, id, page = 1, page_size = 10 } = payload;
  const query = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    query._id = id;
  }

  if (customerId && mongoose.Types.ObjectId.isValid(customerId)) {
    query.customerId = customerId;
  }
  const options = {
    page: parseInt(page.toString(), 10),
    limit: parseInt(page_size.toString(), 10),
    lean: true,
    sort: { createdAt: -1 },
  };
  const result = await AddressModel.paginate(query, options);

  return {
    data: result.docs,
    totalRecord: result.totalDocs,
  };
};

