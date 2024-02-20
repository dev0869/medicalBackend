import jwt from "jsonwebtoken";
import env from "dotenv";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "express-async-handler";
env.config();

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accesstoken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    res.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: 401,
      message: error.message,
      isSuccess: false,
    });
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
