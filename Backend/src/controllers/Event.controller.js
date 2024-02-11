import Event from "../models/Event.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.util.js";
import { APIResponse } from "../utils/APIResponse.util.js";
import { APIError } from "../utils/APIError.util.js";

const createEvent = AsyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      startDateTime,
      endDateTime,
      location,
      price,
      isFree,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !startDateTime ||
      !endDateTime ||
      !location ||
      !price ||
      !category
    ) {
      return res.status(402).json(new APIError("Required Field Missing", 402));
    }

    const createEvent = await Event.create({
      title,
      description,
      startDateTime,
      endDateTime,
      location,
      price,
      category,
      isFree,
      organizer: req?.user?.id,
    });

    if (createEvent) {
      res
        .status(200)
        .json(new APIResponse("Event Created Successfully", 200, createEvent));
    } else {
      res.status(502).json(new APIError("Failed to Create Event", 502));
    }
  } catch (error) {
    console.log(error);
    res.status(502).json(new APIError("Failed to Create Event", 502, error));
  }
});

const deleteEvent = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(402)
        .json(
          new APIError("ID Required Please Provide Necessary Parameters", 402)
        );
    }
    const eventDetails = await Event.findByIdAndDelete(id);

    if (!eventDetails) {
      return res.status(502).json(new APIError("Failed to Delete Event", 502));
    }

    res.status(200).json(new APIResponse("Event Deleted Successfully", 200));
  } catch (error) {
    console.log(error);
    res.status(502).json(new APIError("Failed to Delete Event", 502));
  }
});

const getAllEvents = AsyncHandler(async (req, res) => {
  try {
    const allEventDetails = await Event.find({});

    if (allEventDetails?.length === 0 || !allEventDetails) {
      return res
        .status(502)
        .json(new APIError("No Events Available for Now", 502));
    }

    res
      .status(200)
      .json(new APIResponse("Event Details", 200, allEventDetails));
  } catch (error) {
    console.log(error);
    res
      .status(502)
      .json(new APIError(error?.message || "Internal Server Error", 502));
  }
});

const getEventDetailById = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(402)
        .json(new APIError("Id Required Please Provide Valid Parameter", 402));
    }

    const eventDetail = await Event.findById(id);

    if (!eventDetail) {
      return res
        .status(402)
        .json(
          new APIError("There is No Event Available With Provided Id", 402)
        );
    }

    res
      .status(200)
      .json(new APIResponse(`Event Detail With ID ${id}`, 200, eventDetail));
  } catch (error) {
    console.log(error);
    res
      .status(502)
      .json(new APIError(error?.message || "Internal Server Error", 502));
  }
});

const updateEvent = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(402)
        .json(
          new APIError("ID Required. Please provide a valid parameter", 402)
        );
    }

    const {
      title,
      description,
      startDateTime,
      endDateTime,
      location,
      price,
      isFree,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !startDateTime ||
      !endDateTime ||
      !location ||
      !price ||
      !category
    ) {
      return res.status(402).json(new APIError("Required Field Missing", 402));
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        price,
        category,
        isFree,
        organizer: req?.user?.id,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res
        .status(502)
        .json(new APIError("Failed to update event. Event not found", 502));
    }

    res
      .status(200)
      .json(new APIResponse("Event Updated Successfully", 200, updatedEvent));
  } catch (error) {
    console.log(error);
    res
      .status(502)
      .json(new APIError(error?.message || "Internal Server Error", 502));
  }
});

export {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventDetailById,
  updateEvent,
};
