import { config } from "dotenv";

config({ path: "./config/.env" });

console.log("=== ENV VARIABLES ===");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("PORT:", process.env.PORT);
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("ADMIN_URL:", process.env.ADMIN_URL);
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("=====================");
