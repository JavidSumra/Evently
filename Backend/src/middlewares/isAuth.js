import { User } from "../models/User.model.js";
import { APIError } from "../utils/APIError.util.js";
import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.util.js";

export const isAuthenticate = AsyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.authToken ??
      req.headers["Authorization"]?.replace("Bearer ", "") ??
      req.body.token;

    // console.log(token);

    if (!token) {
      throw new APIError("Unauthorize Request", 402);
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decodeToken._id).select(
      "-password -refreshToken"
    );

    if (!User) {
      new APIError("Invalid Access Token", 402);
    }

    req.user = userData;

    next();
  } catch (error) {
    console.log(error);
    throw new APIError(error?.message || "Internal Server Error", 502);
  }
});
