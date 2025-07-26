import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./db/config.js"; 
import userRoutes from './routes/user.routes.js'; 

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoutes);


const startServer = async () => {
  try {
    await config(); 
    app.listen(port, () => {
      console.log(`Server is connected to PORT: ${port} 🔥`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
