import dotenv from "dotenv";
import app from "./src/app.js";
import path from "path";
import mongoose from "mongoose";
const __dirname = path.resolve();
// import "./firebase-config.js";
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const PORT = 3005;

async function startServer() {
  /**
   * connect to mongodb
   */
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("MONGODB CONNECTED...");

  /**
   * start server on PORT
   */
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Access it from http://localhost:${PORT}`);
  });
}

startServer();
