"use strict";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    userName: {
      type: String,
      required: [true, "UserName is Required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Email is Required"],
      min: [8, "Password Length Must be 8 Character Long"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const round = Number(process.env.SALT_ROUND);
  this.password = await bcrypt.hash(this.password, round);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
