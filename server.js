import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
//import { cookieValidator } from "./src/validators/cookies.validator.js";
import { authRoute } from "./src/routes/index.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

// Start the server
app.listen(process.env.BE_PORT);
console.log(`Server is running on port ${process.env.BE_PORT}`);