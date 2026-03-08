import { asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// get user details from frontend
// validation --- no empty fields, email format, password strength
// check if user already exists in the database using email or password
// check for images,check for avatar
// store them on cloudinary and get the url
// create user object in database create entry in database
// remove password and refresh token from the response because we dont want to send them to the frontend
// check for user creation success and send response to the frontend
// return response

const {fullName,email,password,username} = req.body;

console.log("email: ", email);

// validation
if([fullName,email,password,username].some((field) => !field?.trim())){
    throw new ApiError("All fields are required",400);
}
// email format validation -------?
// validator for email ------> in another file


// check user existence in database
const existedUser = User.findOne({$or: [{email}, {username}]});


if(existedUser){
    throw new ApiError("User with email or username already exists",409);
}


// check for images
const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

if(!avatarLocalPath){
    throw new ApiError("Avatar image is required",400);
}


// upload to cloudinary
const avatar = await uploadToCloudinary(avatarLocalPath);
const coverImage = await uploadToCloudinary(coverImageLocalPath);

// check avatar beacuase its required
if(!avatar){
    throw new ApiError("Avatar upload failed",500);
}


// create user in database
// it will take time so we will use async await and wrap it in try catch block to handle errors
const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    // as we have not checked for cover image if its not provieded our code will break because we are trying to access url of undefined
    coverImage: coverImage?.url
})

// remove password and refresh token from response
// select method is used to exclude fields from the response by prefixing them with -
const createdUser = await
user.findById(user._id).select(
    "-password -refreshToken")

    if(!createdUser){
        throw new ApiError("User creation failed",500);
    }

    // send response
    res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"))

    
export default registerUser