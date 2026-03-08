import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const connectionObject = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );

        console.log(`MongoDB is Connected on Host: ${connectionObject.connection.host} 🚀`);

    } catch (error) {
        console.log("MongoDB Connection Error occurs:", error);
        process.exit(1);
    }
};

export default connectDB;
