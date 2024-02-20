import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";
env.config();
const userSchema = new Schema({
  userName: {
    type: String,
    index: true,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });
};
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "1m",
  });
};
userSchema.methods.checkPassWord = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("user", userSchema);
