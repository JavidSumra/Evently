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
import generateEventContent from "../controllers/OpenAI.controller.js";

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

// Route for AI Content and Image Generation
router.route("/NLP/input").post(isAuthenticate, generateEventContent);

router.route("/update/:id").put(isAuthenticate, updateEvent);

router.route("/delete/:id").delete(isAuthenticate, deleteEvent);

export default router;
