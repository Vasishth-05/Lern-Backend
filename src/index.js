import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connect.db.js";

console.log("👉 Starting index.js...");

// Load .env
dotenv.config({ path: "./.env" });
console.log("👉 .env loaded. PORT =", process.env.PORT, "MONGO_URI =", process.env.MONGODB_URI);

// Pick port
const orPORT = process.env.PORT || 4000;
console.log("👉 Using port:", orPORT);

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("👉 DB connection success. Now starting server...");
    app.listen(orPORT, () => {
      console.log(`✅ Server is running on http://localhost:${orPORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed!!", error);
  });
