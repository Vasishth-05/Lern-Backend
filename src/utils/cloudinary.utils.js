import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    //for uploading a file
    const uploadOnCloudinary = async(localFilePath) => {
        try {
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            //console.log("file has been uploaded on cloudinary", response.url)
            fs.unlinkSync(localFilePath)
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath); //removes the locally saved temporary file as the upload operation task failed
            return null;
        }
    }


export {uploadOnCloudinary}