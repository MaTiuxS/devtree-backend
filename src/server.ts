import express, { Application } from "express";
import "dotenv/config";
import router from "./router/router";
import { connectDB } from "./config/db";

// Connect DBs
connectDB();

const app: Application = express();

// Read data from Json
app.use(express.json());

// Routing
app.use("/", router);

export default app;
