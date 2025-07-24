import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./route/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/api/auth", authRoute);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database conected sucess");
  })
  .catch((e) => {
    console.log(e, "failed DB connection");
  });

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
