import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteAccount,
} from "../controllers/User.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);

// Protected or Secure Route
router.route("/logout").get(isAuthenticate, logoutUser);
router.route("/delete/:id").delete(isAuthenticate, deleteAccount);

export default router;
