import "dotenv/config.js";
import { app } from "./src/app.js";
import { connectDB } from "./src/DB/connectDB.js";

const PORT = process.env.PORT || 3008;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on PORT:${PORT}`);
      // simulate a ready application after 1 second
      setTimeout(function () {
        process.send("ready");
      }, 1000);
    });
  })
  .catch((err) => {
    console.log("Connection With DB Failed", err);
  });
