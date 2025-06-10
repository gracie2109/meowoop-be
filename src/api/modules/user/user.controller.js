import { registerUser, loginUser, handleGoogleAuth, refreshAccessToken, logout, logoutAllDevices } from "./user.service";
import createHttpError from "http-errors";


export const register = async (req, res, next) => {
  try {
    const { email, password, name, deviceInfo } = req.body;
    
    const result = await registerUser({
      email,
      password,
      name,
      deviceInfo
    });

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      data: {
        user: result.user
      }
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password, deviceInfo } = req.body;
    
    const result = await loginUser({
      email,
      password,
      deviceInfo
    });


    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      data: {
        user: result.user
      }
    });
  } catch (error) {
    next(error);
  }
};


export const googleCallback = async (req, res, next) => {
  try {
    const profile = req.user;
    
    const result = await handleGoogleAuth(profile);


    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback`);
  } catch (error) {
    next(error);
  }
};

// Refresh token
export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      throw createHttpError.BadRequest("Refresh token là bắt buộc");
    }

    const result = await refreshAccessToken(refreshToken);


    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.json({
      success: true,
      message: "Token đã được refresh"
    });
  } catch (error) {
    next(error);
  }
};


export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.user._id;

    const result = await logout(userId, refreshToken);


    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};


export const logoutAll = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await logoutAllDevices(userId);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      data: {
        user: user.toObject()
      }
    });
  } catch (error) {
    next(error);
  }
};
