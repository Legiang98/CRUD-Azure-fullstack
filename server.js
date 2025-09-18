import express from "express";
import cookieParser from "cookie-parser";
//import { cookieValidator } from "./src/validators/cookies.validator.js";
import { authRoutes, userRoutes } from "./src/routes/index.js";

const app = express();

app.use(express.json());

// Routers
app.use("/", authRoutes);
app.use("/", userRoutes);

// Start the server
app.listen(3000);
console.log("Server is running on port 3000");
