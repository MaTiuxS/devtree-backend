import express, { Application } from "express";
import "dotenv/config";
import router from "./router/router";
import { connectDB } from "./config/db";
import cors from "cors";
import { corsConfig } from "./config/cors";

// Connect DBs
connectDB();

const app: Application = express();

// cors
app.use(cors(corsConfig));

// Read data from Json
app.use(express.json());

// Routing
app.use("/", router);

export default app;
