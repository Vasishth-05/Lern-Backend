import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exist - username and email
    // check for images and check for avatar
    // upload them to cloudinary, avatar
    // create user Object - create entry in db 
    // remove password and refresh token field from response
    // check that user is created or not 
    // return response

    const { fullname, username, email, password } = req.body
    console.log("email : " , email);

    // can check everything by repeating if statement multiple times
    // if (fullname == "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    // but in single line more refined one we can do is by using (some) method
    if (
        [fullname,username,email,password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    
    const user = await User.create({
       fullname,
       avatar : avatar.url,
       coverImage : coverImage?.url || "",
       email,
       password,
       username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        //so that we can remove the password and refreshToken field from the localPathFile
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

export {registerUser}