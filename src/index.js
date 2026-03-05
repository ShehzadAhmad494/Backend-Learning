import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/connection.js";

dotenv.config({ path: "../.env" });

const app = express();

connectDB();
// This is poluting over index.js so we use db (connection.js for this connection)
/*
(async () => {
  try {

    console.log("Mongo URL:", process.env.MONGODB_URL);

    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
})(); */