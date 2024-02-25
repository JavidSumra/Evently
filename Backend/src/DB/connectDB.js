import mongoose from "mongoose";

const DB_NAME = "Evently";

const connectDB = async () => {
  try {
    const connectionInstance =
      await mongoose.connect(`${process.env.MONGO_DB_URL}${DB_NAME}
      `);

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
