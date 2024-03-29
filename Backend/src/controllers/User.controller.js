import { User } from "../models/User.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.util.js";
import { APIError } from "../utils/APIError.util.js";
import { APIResponse } from "../utils/APIResponse.util.js";
import jwt from "jsonwebtoken";

const generateToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return new APIError("Error While Generating Token", 502);
  }
};

const registerUser = AsyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    if ([email, userName, password].some((attr) => attr?.trim() === "")) {
      return res.status(402).json(new APIError("All fields are required", 402));
    }

    const isUserExist = await User.findOne({
      email,
    });

    if (isUserExist) {
      return res
        .status(402)
        .json(new APIError("User Already Exist With Provided Email", 402));
    }

    if (password.length < 8) {
      return res
        .status(402)
        .json(new APIError("Password Must be 8 Character Long", 402));
    }

    const createUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    const isUserCreated = await User.findById({ _id: createUser._id }).select(
      "-password -refreshToken -created_at -updated_at -__v"
    );

    const { accessToken, refreshToken } = await generateToken(
      isUserCreated?._id
    );

    if (isUserCreated) {
      res
        .status(200)
        .cookie("authToken", accessToken, {
          maxAge: 604800000,
        })
        .cookie("refreshToken", refreshToken, {
          maxAge: 2592000000,
        })
        .json(new APIResponse("User Created Successfully", 200, isUserCreated));
    } else {
      res.status(502).json(new APIError("Failed to Create User", 502));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(502)
      .json(new APIError(error?.message || "Internal Server Error", 502));
  }
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(402).json(new APIError("All Fields are Required", 402));
  }

  const isUserExist = await User.findOne({ email }).select("-refreshToken");

  if (!isUserExist) {
    return res.status(402).json(new APIError("User Not Exist", 402));
  }

  const isPasswordCorrect = await isUserExist.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(402).json(new APIError("Invalid User Credentials", 402));
  }

  const loggedInUser = await User.findById(isUserExist?._id).select(
    "-password -refreshToken -created_at -updated_at -__v"
  );

  const { accessToken, refreshToken } = await generateToken(isUserExist?._id);

  res
    .status(200)
    .cookie("authToken", accessToken, {
      maxAge: 86400000, // 1 Days
    })
    .cookie("refreshToken", refreshToken, {
      maxAge: 1296000000, //15 Days
    })
    .json(new APIResponse("User Logged In Successfully", 200, loggedInUser));
});

const logoutUser = AsyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user?.id },
      {
        $unset: {
          refreshToken: "",
        },
      },
      {
        new: true,
      }
    );

    res
      .status(200)
      .clearCookie("authToken")
      .json(new APIResponse("User Logged Out Successfully", 200));
  } catch (error) {
    console.log(error);
  }
});

const deleteAccount = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(402)
        .json(new APIError("Provide Necessary Parameters", 402));
    }

    const isUserExistWithId = await User.findById(id);

    if (!isUserExistWithId) {
      return res
        .status(402)
        .json(new APIError(`User Not Exist With ID : ${id}`, 402));
    }

    const isDeleted = await User.findByIdAndDelete(id);

    if (!isDeleted) {
      return res
        .status(502)
        .json(new APIError("Failed to Delete Account", 502));
    }

    res
      .status(200)
      .json(new APIResponse("Account Deleted Successfully", 200, isDeleted));
  } catch (error) {
    console.log(error);
    res.status(502).json(new APIError("Failed to Delete Account", 502));
  }
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(402).json(new APIError("Refresh Token Required", 402));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken?._id) {
      return res
        .status(402)
        .json(new APIError("Invalid or Expired Refresh Token", 402));
    }

    const isUserExist = await User.findById(decodeToken?._id);

    if (!isUserExist) {
      return res
        .status(402)
        .json(new APIError("Invalid or Expired Refresh Token", 402));
    }

    const loggedInUser = await User.findById(isUserExist?._id).select(
      "-password -refreshToken -created_at -updated_at -__v"
    );

    const { accessToken, refreshToken } = await generateToken(isUserExist?._id);

    res
      .status(200)
      .cookie("authToken", accessToken, {
        maxAge: 604800000, // 7 Days
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 2592000000, //30 Days
      })
      .json(new APIResponse("User Logged In Successfully", 200, loggedInUser));
  } catch (error) {
    console.log(error);
    res
      .status(502)
      .json(new APIError(error?.message || "Internal Server Error", 502));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteAccount,
  refreshAccessToken,
};
