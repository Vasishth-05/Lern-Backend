import dotenv from "dotenv";
import connectDB from "./db/connect.db.js";

dotenv.config({
    path: './env'
});

connectDB();































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