import "dotenv/config.js";
import { app } from "./src/app.js";
import { connectDB } from "./src/DB/connectDB.js";

const PORT = process.env.PORT || 3008;

connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server Running on PORT:${PORT}`);
        // simulate a ready application after 1 second
        setTimeout(function () {
          process.send("ready");
        }, 4000);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((err) => {
    console.log("Connection With DB Failed", err);
  });
