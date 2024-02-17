import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuth.middleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventDetailById,
  updateEvent,
} from "../controllers/Event.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/create")
  .post(
    isAuthenticate,
    upload.fields([{ name: "Image", maxCount: 1 }]),
    createEvent
  );

router.route("/details").get(getAllEvents);
router.route("/details/:id").get(getEventDetailById);

router.route("/update/:id").put(isAuthenticate, updateEvent);

router.route("/delete/:id").delete(isAuthenticate, deleteEvent);

export default router;
