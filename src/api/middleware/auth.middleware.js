import 'dotenv/config'
import createHttpError from 'http-errors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "../modules/user/user.schema";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw createHttpError.Unauthorized("Không tìm thấy token");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== "access") {
      throw createHttpError.Unauthorized("Token không hợp lệ");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw createHttpError.Unauthorized("User không tồn tại");
    }

    if (!user.isActive) {
      throw createHttpError.Unauthorized("Tài khoản đã bị khóa");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(createHttpError.Unauthorized("Token không hợp lệ"));
    } else if (error.name === "TokenExpiredError") {
      next(createHttpError.Unauthorized("Token đã hết hạn"));
    } else {
      next(error);
    }
  }
};

export default function AuthGuard(req, res, next) {

}