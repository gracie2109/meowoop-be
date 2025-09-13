import mongoose from "mongoose";
import User from "./user.schema.js";
import createHttpError from "http-errors";
import AddressModel from "../address/address.schema.js";
import { createAuthRecord, generateTokens } from "../auth/auth.service.js";
import { createUserAddressController } from "../address/address.controller.js";
import { createUserAddress } from "../address/address.service.js";
import { findCustomer } from "../../../helpers/query.js";
import bcrypt from "bcryptjs";
export const registerUser = async (payload) => {
  const { email, password, name } = payload;

  if (!email || !password) {
    throw createHttpError.BadRequest("Email và password là bắt buộc");
  }

  const existed = await User.findOne({ email });
  if (existed) {
    throw createHttpError.Conflict("Email đã tồn tại");
  }

  // Create user
  const user = await User.create({
    email,
    name,
  });

  // Create auth record
  await createAuthRecord(user._id, password);

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(
    user,
    payload.deviceInfo
  );

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (payload) => {
  const { email, password, device_info } = payload;

  if (!email || !password) {
    throw createHttpError.BadRequest("Email và password là bắt buộc");
  }

  // Use auth service for login
  const { loginWithPassword, generateTokens } = await import(
    "../auth/auth.service.js"
  );
  const { user } = await loginWithPassword(email, password);

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user, device_info);

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const handleGoogleAuth = async (profile) => {
  const { id, emails, displayName, photos } = profile;

  // Use auth service for Google auth
  const { handleGoogleAuth: authGoogleHandler, generateTokens } = await import(
    "../auth/auth.service.js"
  );

  const googleProfile = {
    id,
    email: emails[0].value,
    name: displayName,
    picture: photos?.[0]?.value,
  };

  const { user } = await authGoogleHandler(googleProfile);

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user, {
    platform: "Google OAuth",
  });

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  // Use auth service for token refresh
  const { refreshAccessToken: authRefreshToken } = await import(
    "../auth/auth.service.js"
  );
  return await authRefreshToken(refreshToken);
};

export const logout = async (userId, refreshToken) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User không tồn tại");
  }

  // Use auth service to revoke token
  const { revokeRefreshToken } = await import("../auth/auth.service.js");
  await revokeRefreshToken(refreshToken);

  return { message: "Đăng xuất thành công" };
};

export const logoutAllDevices = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User không tồn tại");
  }

  user.refesh_token.forEach((token) => {
    token.is_revoked = true;
  });

  await user.save();
  return { message: "Đã đăng xuất khỏi tất cả thiết bị" };
};

//
export const setDefaultAddress = async (payload) => {
  const { userId, addressId, isExistedAddress, info } = payload;
  if (!userId) {
    throw createHttpError.BadRequest("Invalid or missing userId");
  }

  const messageSuccess = "Update default address successfully!";

  // case 1: addressId exist on db

  if (isExistedAddress) {
    if (!addressId) {
      throw createHttpError.BadRequest("Invalid or missing addressId");
    }
    const checkAddressExist = await User.findByIdAndUpdate(
      userId,
      { $set: { defaultAddressId: addressId } },
      { new: true }
    );

    if (!checkAddressExist) {
      throw createHttpError.BadRequest("Not found address of user");
    }
  }

  // case 2 : address is new

  if (!isExistedAddress && info) {
    const newDataHasDefault = info?.isDefault;
    const newAddress = await AddressModel.create({ ...info });

    if (newDataHasDefault) {
      if (newAddress) {
        await User.findByIdAndUpdate(
          userId,
          { $set: { defaultAddressId: newAddress?._id } },
          { new: true }
        );
      }
    } else {
    }
  }
  return { message: messageSuccess };
};

export const upsertUserInfo = async (payload) => {
  const { userId } = payload;
  if (!userId) {
    throw createHttpError.BadRequest("Invalid or missing userId");
  }

  const data = User.findByIdAndUpdate(userId, payload, {
    upsert: true,
  });

  if (!data) {
    return createHttpError.BadRequest("Update user fail!");
  }
  return data.toObject();
};

export const searchListCustomers = async (payload) => {
  const {
    page = 1,
    page_size = 25,
    search_text = "",
    id,
    isShowAddress = false,
  } = payload;

  // Build match stage
  const matchStage = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    matchStage._id = new mongoose.Types.ObjectId(id);
  }

  if (search_text) {
    matchStage.$or = [
      { name: { $regex: search_text, $options: "i" } },
      { email: { $regex: search_text, $options: "i" } },
      { fullName: { $regex: search_text, $options: "i" } },
      { phone_number: { $regex: search_text, $options: "i" } },
    ];
  }

  const pipeline = [{ $match: matchStage }, { $sort: { createdAt: -1 } }];

  if (isShowAddress) {
    pipeline.push({
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "customerId",
        as: "addresses",
        pipeline: [
          {
            $project: {
              createdAt: 0,
              updatedAt: 0,
            },
          },
          {
            $addFields: {
              fullAddress: {
                $concat: [
                  { $ifNull: ["$detail", ""] },
                  {
                    $cond: {
                      if: { $ne: ["$detail", ""] },
                      then: ", ",
                      else: "",
                    },
                  },
                  { $ifNull: ["$ward_name", ""] },
                  {
                    $cond: {
                      if: { $ne: ["$ward_name", ""] },
                      then: ", ",
                      else: "",
                    },
                  },
                  { $ifNull: ["$district_name", ""] },
                  {
                    $cond: {
                      if: { $ne: ["$district_name", ""] },
                      then: ", ",
                      else: "",
                    },
                  },
                  { $ifNull: ["$city_name", ""] },
                ],
              },
            },
          },
        ],
      },
    });
  }

  const skip = (parseInt(page) - 1) * parseInt(page_size);
  const limit = parseInt(page_size);

  const countPipeline = [...pipeline, { $count: "total" }];
  const totalResult = await User.aggregate(countPipeline);
  const totalRecord = totalResult[0]?.total || 0;

  pipeline.push({ $skip: skip }, { $limit: limit });

  const result = await User.aggregate(pipeline);

  return {
    data: result,
    totalRecord,
  };
};

export const createCustomer = async (payload) => {
  try {
    const { name, password, address, ...userData } = payload;
    if (!name || !password) {
      throw createHttpError.BadRequest("Name và passW0rd là bắt buộc");
    }
    const existedUser = await findCustomer(payload);

    if (existedUser) {
      throw createHttpError.Conflict("Tài khoản đã tồn tại");
    }

    // Hash password if provided (similar to createAuthRecord)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const cleanUserData = {
      name,
      password: hashedPassword,
      ...userData,
    };

    Object.keys(cleanUserData).forEach((key) => {
      if (
        Array.isArray(cleanUserData[key]) &&
        cleanUserData[key].length === 0
      ) {
        delete cleanUserData[key];
      }
    });

    const user = await User.create(cleanUserData);
    let address_;
    if (user && address) {
      address_ = await createUserAddress({ ...address, customerId: user?._id });
    }
    return {
      data: {
        ...user.toObject(),
        address: address_,
      },
    };
  } catch (error) {
    console.error("Error in createCustomer:", error);
    throw error;
  }
};



