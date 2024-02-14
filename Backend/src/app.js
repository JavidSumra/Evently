// Dependency Import
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

// Routes Import
import UserRoute from "./routes/user.routes.js";
import EventRoute from "./routes/event.routes.js";

const app = express();

// Payload Configuration
app.use(bodyParser.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));

// CORS Configuration
app.use(cors());

//Cookies Parsing
app.use(cookieParser());

// Temp folder for Image Upload
app.use(express.static("public"));

// Route Declaration
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/event", EventRoute);

export { app };
