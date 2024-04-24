import Event from "../models/Event.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.util.js";
import { APIResponse } from "../utils/APIResponse.util.js";
import { APIError } from "../utils/APIError.util.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.util.js";

const createEvent = AsyncHandler(async (req, res) => {
  let coverImagePath = null;
  let coverImage = null;

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

    if (req.files?.Image) {
      console.log(req.files.Image);

      coverImagePath = await req.files?.Image[0]?.path;

      coverImage = await uploadOnCloudinary(coverImagePath);

      if (!coverImagePath) {
        return res
          .status(502)
          .json(
            new APIError("Failed to Create Event Cover Image Required", 502)
          );
      }
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
      coverImage: coverImage?.url || req.body.Image,
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
    const allEventDetails = await Event.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "organizer",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      {
        $unwind: "$eventDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          organizer: 1,
          location: 1,
          coverImage: 1,
          price: 1,
          isFree: 1,
          category: 1,
          startDateTime: 1,
          endDateTime: 1,
          firstName: "$eventDetails.firstName",
          lastName: "$eventDetails.lastName",
        },
      },
    ]);

    if (allEventDetails?.length === 0 || !allEventDetails) {
      return res
        .status(200)
        .json(new APIError("No Events Available for Now", 200));
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
