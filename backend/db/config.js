import mongoose from "mongoose";

const config = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MONGO DB 😎");
  } catch (error) {
    console.log("Error in connecting to MONGO DB 😟", error);
  }
};

export default config;