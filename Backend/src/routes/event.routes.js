import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuth.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventDetailById,
  updateEvent,
} from "../controllers/Event.controller.js";

const router = Router();

router.route("/create").post(isAuthenticate, createEvent);

router.route("/details").get(isAuthenticate, getAllEvents);
router.route("/details/:id").get(isAuthenticate, getEventDetailById);

router.route("/update/:id").put(isAuthenticate, updateEvent);

router.route("/delete/:id").delete(isAuthenticate, deleteEvent);

export default router;
