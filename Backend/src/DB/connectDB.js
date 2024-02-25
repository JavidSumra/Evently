import mongoose from "mongoose";
const ENV = process.env.NODE_ENV || "development";

const URL =
  ENV != "development"
    ? process.env.MONGO_DB_URL
    : "mongodb://127.0.0.1:27017/Evently";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(URL);

    console.log(
      "Successfully Connected to Mongo DB at Host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error While Connecting To Mongo DB", error);
    process.exit(1);
  }
};

export { connectDB };
