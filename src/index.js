import { app } from "./app.js";

import dotenv from "dotenv";
import {connectDB} from "./db/connect.db.js"

dotenv.config({
    path: './env'
});

const orPORT = process.env.PORT || 4000

connectDB()
    .then(()=>{
        app.listen(orPORT, () => {
            console.log(`Server is running on ${orPORT}`); 
        })
    })
    .catch((err)=>{
        console.log("mongoDB connection failed !!", err);
    })































/*
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        app.on("error", (error) => {
            console.log("error :", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on PORT : ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR : ",error);
        throw error;
    }
})() */