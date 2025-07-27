import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./db/config.js"; 
import authRoutes from './routes/auth.routes.js'; 
import postRoutes from './routes/post.routes.js'; 
import commentRoutes from './routes/comment.routes.js'; 
import userRoutes from './routes/user.routes.js'; 
import adminRoutes from './routes/admin.routes.js'

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


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
