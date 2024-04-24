import OpenAI from "openai";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/Cloudinary.util.js";
import { APIResponse } from "../utils/APIResponse.util.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt =
  "You are an assistant helping a user to Manage their Events Detail. " +
  "Given a message, you should extract the Event Details from it. " +
  "The user may provide a title, description, location, price, is Free or not, category,thumbnailImagePrompt along with startDateTime or endDateTime. " +
  "To compute relative dates, assume that the current timestamp is " +
  new Date().toISOString() +
  ". ";
const generateEventContent = async (req, res, next) => {
  try {
    const prompt = req.body.prompt;

    let Cloudinaryresponse = null;

    console.log(req.body);
    let imageType = "jpeg"; //! Default Type
    let filePath = "";

    const eventContentGenerate = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "createEvent",
            description: "Create a New Event Details",
            parameters: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The Title of the Event",
                },
                description: {
                  type: "string",
                  description: "The Description of the Event",
                },
                location: {
                  type: "string",
                  description: "The Location of the Event",
                },
                price: {
                  type: "string",
                  description: "The Price of the Event",
                },
                isFree: {
                  type: "boolean",
                  description: "Whether the Event is Free",
                  default: false,
                },
                category: {
                  type: "string",
                  description: "The Category of the Event",
                },
                startDateTime: {
                  type: "string",
                  description:
                    "The Start Date and Time of the Event as ISO8601",
                },
                endDateTime: {
                  type: "string",
                  description: "The End Date and Time of the Event as ISO8601",
                },
                thumbnailImagePrompt: {
                  type: "string",
                  description:
                    "The Long Description and Attractive Text to Generate Image for Thumbnail Image of the Event",
                },
              },
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "createEvent" } },
      model: "gpt-3.5-turbo",
    });

    const eventDetails =
      eventContentGenerate?.choices[0]?.message?.tool_calls[0]?.function
        ?.arguments;

    // Parse event details from JSON string
    const { thumbnailImagePrompt } = JSON.parse(eventDetails);

    thumbnailImagePrompt &&
      (await query({ inputs: thumbnailImagePrompt })
        .then(async (response) => {
          let buffer = await response.arrayBuffer();
          buffer = Buffer.from(buffer);

          imageType = response.type.split("/")[1];

          // Specify the file path where you want to write the file
          filePath = `${import.meta.dirname.split("src")[0] + "public\\temp"}\\AI_Generated_Image.${imageType}`;
          // Write the buffer to the file
          fs.writeFileSync(filePath, buffer);
          console.log("File written successfully to:", filePath);
        })
        .catch((error) => {
          console.log(error);
        }));
    filePath = `${import.meta.dirname.split("src")[0] + "public\\temp"}\\AI_Generated_Image.${imageType}`;
    if (filePath) {
      Cloudinaryresponse = await uploadOnCloudinary(filePath);
    }

    res.status(200).json(
      new APIResponse("AI Generate Response", 200, {
        ...JSON.parse(eventDetails),
        coverImage: Cloudinaryresponse?.url,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();

  return result;
}

export default generateEventContent;
