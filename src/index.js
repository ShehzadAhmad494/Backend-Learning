import dotenv from "dotenv"
import connectDB from "./db/connection.js";
import app from "./app.js"

// Main Headache ???
dotenv.config({
    path: "./.env"
})

console.log(`Connection Break! ${process.env.MONGODB_URL}`);
// as this is async (Promises) it gives .then and .catch
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is Listening on localhost:${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Database Connection Failed: ", error)
})
