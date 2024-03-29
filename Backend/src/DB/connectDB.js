import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_DB_URL,
      { useNewUrlParser: true }
    );

    console.log(
      "Successfully Connected to Mongo DB at Host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log(process.env.MONGO_DB_URL);
    console.log("Error While Connecting To Mongo DB", error);
    process.exit(1);
  }
};

export { connectDB };
