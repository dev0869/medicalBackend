import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRes } from "../utils/ApiRes.js";

export const registerController = expressAsyncHandler(async (req, res) => {
  try {
    const { userName, mobileNo, email, password } = req.body;
    if (!userName || !mobileNo || !email || !password) {
      res.status(400).json(new ApiError("All Fields are Required"));
    }

    const ExistUser = await User.findOne({
      $or: [{ mobileNo }, { email }],
    });
    if (ExistUser) {
      res.status(400).json(new ApiError("User Already Created"));
    }

    const newUser = await User.create(req.body);
    if (!newUser) {
      res.status(400).json(new ApiError("Failde for user Creation on Db"));
    }

    const userData = await User.findById(newUser._id).select("-password");
    return res
      .status(201)
      .send(new ApiRes(200, userData, "User Successfully Registered!"));
  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginController = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
  
  
    const CheckUser = await User.findOne({
      $or: [{ email }],
    });
    if (!CheckUser) {
       return res.status(400).json(new ApiError("User not found"));
    }
  
    const isPassWordCorrect = await CheckUser.checkPassWord(password);
    if (!isPassWordCorrect){
      return res.status(400).json(new ApiError("Invalid Credentials"));

    }
  
    const RefeshToken = await CheckUser.generateRefreshToken();
    const AccessToken = await CheckUser.generateAccessToken();
  
    if (!RefeshToken || !AccessToken)
      throw new ApiError(500, "Failed to generate Refresh Token");
  
    CheckUser.refreshToken = RefeshToken;
    CheckUser.save({ validateBeforeSave: false });
    const options = {
      httpOnly: true,
      secure: true,
    }
    return res
      .cookie("refreshtoken", RefeshToken, options)
      .cookie("accesstoken", AccessToken, options)
      .send(
        new ApiRes(200, { RefeshToken, AccessToken }, "User Succesfully Login")
      );
  } catch (error) {
   throw new Error(error);
  }
});

export const logout = expressAsyncHandler(async (req, res) => {
  const userId = res.user._id;

  try {
    await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("refresh_token")
      .clearCookie("access_token")
      .json(new ApiRes(200, {}, "Logout Succesfully"));
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const Verify = expressAsyncHandler(async (req, res) => {
  const user = res.user;
  return res.json(new ApiRes(200, user, "User SuucessFully Verified"));
});
export const generateAccessToken = expressAsyncHandler(async (req, res) => {
  const user = res.user;
  const AccessToken = user.generateAccessToken();
  return res.json(
    new ApiRes(200, AccessToken, "accesstoken SuucessFully Generated")
  );
});


export const generatecookie = expressAsyncHandler(async (req, res) => {
  res.cookie("poke",34).send('hii')
});