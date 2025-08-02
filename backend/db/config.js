import dotenv from "dotenv";
dotenv.config(); // or dotenv.config({ path: './.env' });

import mongoose from "mongoose";

// Debug logs
console.log("✅ Loaded MONGO_URL:", process.env.MONGO_URL);
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in environment variables!");
  process.exit(1);
}

const config = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MONGO DB 😎");
  } catch (error) {
    console.log("❌ Error in connecting to MONGO DB 😟", error);
  }
};

export default config;
