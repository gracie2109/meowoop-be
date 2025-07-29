import express from "express";
import Resource from "./resource.schema.js";
import PermissionSchema from "./permission.schema.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { STATUS } from "../../../constants/permission.js";

// BE tạo resource + permission
export const upsertResourceAndPermission = async (body) => {
  try {
    const { name, actions } = body;
    let resource = await Resource.findOne({ key: `resource::${name}` });
    if (!resource) {
      resource = await Resource.create({
        name,
        key: `resource::${name}`,
      });
    }

    const pers = await Promise.all(
      actions.map((action) => {
        return PermissionSchema.create({
          resource_id: resource._id,
          action_name: action,
          action_key: `action::${action}`,
          status: STATUS.ACTIVE,
        });
      })
    );
    return {
      resource: resource,
      permissions: pers,
    };
  } catch (error) {
    console.log("err", error);
  }
};

const aggregateResourceDetails = async (matchCondition = {}) => {
  return await Resource.aggregate([
    {
      $match: matchCondition,
    },
    {
      $lookup: {
        from: "permissions",
        localField: "_id",
        foreignField: "resource_id",
        as: "permissions",
      },
    },
  ]);
};

export const getAllResourceDetails = async () => {
  return await aggregateResourceDetails();
};

const getSingleResourceDetail = async (resource_id) => {
  if (!resource_id) {
    throw createHttpError.BadRequest("Thiếu dữ liệu đầu vào");
  }

  if (!mongoose.Types.ObjectId.isValid(resource_id)) {
    throw createHttpError.BadRequest("resource_id không hợp lệ");
  }

  const result = await aggregateResourceDetails({
    _id: new mongoose.Types.ObjectId(resource_id),
  });

  return result.length > 0 ? result[0] : null;
};

export const getResourceDetail = async ({ resource_id, isAll }) => {
  try {
    if (isAll) {
      return await getAllResourceDetails();
    }
    const result = await getSingleResourceDetail(resource_id);
    return result ? [result] : null;
  } catch (error) {
    console.error("getResourceDetail error:", error);
    throw createHttpError.InternalServerError("Lỗi xử lý dữ liệu");
  }
};
