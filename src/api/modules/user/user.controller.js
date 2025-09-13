import {
  createCustomer,
  registerUser,
  searchListCustomers,
} from "./user.service.js";
import createHttpError from "http-errors";

// Auth methods moved to auth.controller.js

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: user.toObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const searchListCustomer = async (req, res, next) => {
  try {
    const data = await searchListCustomers(req.body);
    res.json({
      success: true,
      contents: data,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
        console.log('controllder', req.body);

    const data = await createCustomer(req.body);    
    res.json({
      success: true,
      contents: data,
    });
  } catch (error) {
    next(error);
  }
};
