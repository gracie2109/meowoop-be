import mongoose from "mongoose";
import User from "./user.schema";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AddressModel from "../address/address.schema";
// Constants
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// Helper functions
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      type: "access",
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

export const registerUser = async (payload) => {
  const { email, password, name } = payload;

  if (!email || !password) {
    throw createHttpError.BadRequest("Email và password là bắt buộc");
  }

  const existed = await User.findOne({ email });
  if (existed) {
    throw createHttpError.Conflict("Email đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    refreshTokens: [
      {
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
        deviceInfo: payload.deviceInfo || "Unknown Device",
      },
    ],
  });

  const accessToken = generateAccessToken(user);

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (payload) => {
  const { email, password, deviceInfo } = payload;

  if (!email || !password) {
    throw createHttpError.BadRequest("Email và password là bắt buộc");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError.Unauthorized("Email hoặc mật khẩu không đúng");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError.Unauthorized("Email hoặc mật khẩu không đúng");
  }

  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: refreshTokenExpiresAt,
    deviceInfo: deviceInfo || "Unknown Device",
  });

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = generateAccessToken(user);

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const handleGoogleAuth = async (profile) => {
  const { id, emails, displayName, photos } = profile;

  let user = await User.findOne({
    $or: [{ googleId: id }, { email: emails[0].value }],
  });

  if (!user) {
    const refreshToken = generateRefreshToken();
    const refreshTokenExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    user = await User.create({
      email: emails[0].value,
      name: displayName,
      googleId: id,
      avatar: photos?.[0]?.value,
      refreshTokens: [
        {
          token: refreshToken,
          expiresAt: refreshTokenExpiresAt,
          deviceInfo: "Google OAuth",
        },
      ],
    });
  } else if (!user.googleId) {
    user.googleId = id;
    user.avatar = photos?.[0]?.value;
  }

  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: refreshTokenExpiresAt,
    deviceInfo: "Google OAuth",
  });

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = generateAccessToken(user);

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  const user = await User.findOne({
    "refreshTokens.token": refreshToken,
    "refreshTokens.isRevoked": false,
    "refreshTokens.expiresAt": { $gt: new Date() },
  });

  if (!user) {
    throw createHttpError.Unauthorized(
      "Refresh token không hợp lệ hoặc đã hết hạn"
    );
  }

  const accessToken = generateAccessToken(user);
  return { accessToken };
};

export const logout = async (userId, refreshToken) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User không tồn tại");
  }

  // Revoke specific refresh token
  const tokenIndex = user.refreshTokens.findIndex(
    (token) => token.token === refreshToken && !token.isRevoked
  );

  if (tokenIndex !== -1) {
    user.refreshTokens[tokenIndex].isRevoked = true;
    await user.save();
  }

  return { message: "Đăng xuất thành công" };
};

export const logoutAllDevices = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User không tồn tại");
  }

  user.refreshTokens.forEach((token) => {
    token.isRevoked = true;
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

  if(!data) {
    return createHttpError.BadRequest("Update user fail!");
  }
  return data.toObject()
};


