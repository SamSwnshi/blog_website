import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./db/config.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is connected to PORT: ${port} 🔥`);
  config()
});