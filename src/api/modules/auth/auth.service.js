import mongoose from "mongoose";
import Auth from "./auth.schema.js";
import User from "../user/user.schema.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

export const createAuthRecord = async (userId, password, googleId = null) => {
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  
  const auth = await Auth.create({
    user_id: userId,
    password: hashedPassword,
    google_id: googleId,
  });

  return auth;
};

export const loginWithPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError.Unauthorized("Email hoặc mật khẩu không đúng");
  }

  const auth = await Auth.findOne({ user_id: user._id });
  if (!auth || !auth.password) {
    throw createHttpError.Unauthorized("Email hoặc mật khẩu không đúng");
  }

  const isValidPassword = await bcrypt.compare(password, auth.password);
  if (!isValidPassword) {
    throw createHttpError.Unauthorized("Email hoặc mật khẩu không đúng");
  }

  return { user, auth };
};

export const generateTokens = async (user, deviceInfo = {}) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Update auth record with new refresh token
  await Auth.findOneAndUpdate(
    { user_id: user._id },
    {
      $push: {
        refresh_tokens: {
          token: refreshToken,
          expires_at: refreshTokenExpiresAt,
          device_info: deviceInfo,
        },
      },
      last_login_at: new Date(),
    }
  );

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  const auth = await Auth.findOne({
    "refresh_tokens.token": refreshToken,
    "refresh_tokens.is_revoked": false,
    "refresh_tokens.expires_at": { $gt: new Date() },
  });

  if (!auth) {
    throw createHttpError.Unauthorized("Invalid refresh token");
  }

  const user = await User.findById(auth.user_id);
  if (!user) {
    throw createHttpError.Unauthorized("User not found");
  }

  const newAccessToken = generateAccessToken(user);
  return { accessToken: newAccessToken, user };
};

export const revokeRefreshToken = async (refreshToken) => {
  await Auth.updateOne(
    { "refresh_tokens.token": refreshToken },
    { $set: { "refresh_tokens.$.is_revoked": true } }
  );
};

export const revokeAllRefreshTokens = async (userId) => {
  await Auth.updateOne(
    { user_id: userId },
    { $set: { "refresh_tokens.$[].is_revoked": true } }
  );
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const auth = await Auth.findOne({ user_id: userId });
  if (!auth) {
    throw createHttpError.NotFound("Auth record not found");
  }

  if (auth.password) {
    const isValidPassword = await bcrypt.compare(oldPassword, auth.password);
    if (!isValidPassword) {
      throw createHttpError.BadRequest("Mật khẩu cũ không đúng");
    }
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
  await Auth.findOneAndUpdate(
    { user_id: userId },
    {
      password: hashedNewPassword,
      password_changed_at: new Date(),
    }
  );
};

export const handleGoogleAuth = async (profile) => {
  let user = await User.findOne({ email: profile.email });
  let auth;

  if (!user) {
    // Create new user
    user = await User.create({
      email: profile.email,
      name: profile.name,
      avatar: profile.picture,
    });

    // Create auth record
    auth = await createAuthRecord(user._id, null, profile.id);
  } else {
    // Update existing user if needed
    if (!user.avatar && profile.picture) {
      user.avatar = profile.picture;
      await user.save();
    }

    // Find or create auth record
    auth = await Auth.findOne({ user_id: user._id });
    if (!auth) {
      auth = await createAuthRecord(user._id, null, profile.id);
    } else if (!auth.google_id) {
      auth.google_id = profile.id;
      await auth.save();
    }
  }

  return { user, auth };
};
