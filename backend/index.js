import express from "express";
import { config } from "dotenv";
import cors from "cors";
config();
const app = express();

const port = 8000;
app.use(express.json());
app.use(cors({ origin: "https://sunny-cucurucho-874658.netlify.app/" }));
app.use(express.urlencoded({ extended: true }));

import commitRoute from "./routes/commit.route.js";
app.use("/git", commitRoute);
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
