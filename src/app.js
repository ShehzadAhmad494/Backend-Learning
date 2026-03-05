import express from "express"
import cors from "cors"

// cookies from the user browser (accrss,set) from my server
import cookieParser from "cookie-parser"


const app = express()


// middleware configuration 
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        Credential:true
    }
))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))


app.use(express.cookieParser())

export default app