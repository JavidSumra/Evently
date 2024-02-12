import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      // required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    endDateTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
