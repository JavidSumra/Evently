import { app } from "./src/app.js";
import { connectDB } from "./src/DB/connectDB.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3008;

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection With DB Failed", err);
  });
