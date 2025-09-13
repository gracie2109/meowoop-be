import {
  loginWithPassword,
  handleGoogleAuth,
  refreshAccessToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
  changePassword,
} from "./auth.service.js";
import { registerUser } from "../user/user.service.js";
import { useCatchAsync } from "../../../helpers/useCatchAsync.js";

export const register = useCatchAsync(async (req, res) => {
  const result = await registerUser({
    ...req.body,
    deviceInfo: {
      platform: req.headers["user-agent"] || "Unknown",
      ip: req.ip,
    },
  });

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: "Đăng ký thành công",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const login = useCatchAsync(async (req, res) => {
  const { user, auth } = await loginWithPassword(req.body.email, req.body.password);
  
  const { generateTokens } = await import("./auth.service.js");
  const { accessToken, refreshToken } = await generateTokens(user, {
    platform: req.headers["user-agent"] || "Unknown",
    ip: req.ip,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Đăng nhập thành công",
    data: {
      user: user.toObject(),
      accessToken,
    },
  });
});

export const googleAuth = useCatchAsync(async (req, res) => {
  const { user } = await handleGoogleAuth(req.user);
  
  const { generateTokens } = await import("./auth.service.js");
  const { accessToken, refreshToken } = await generateTokens(user, {
    platform: "Google OAuth",
    ip: req.ip,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});

export const refreshToken = useCatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }

  const result = await refreshAccessToken(refreshToken);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const logout = useCatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  });
});

export const logoutAll = useCatchAsync(async (req, res) => {
  await revokeAllRefreshTokens(req.user.id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Đăng xuất khỏi tất cả thiết bị thành công",
  });
});

export const changeUserPassword = useCatchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  await changePassword(req.user.id, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
});
