import { v2 as cloudinary } from "cloudinary";
import { getEnv } from "../utils/env";

cloudinary.config({
  cloud_name: getEnv("CLOUDINARY_NAME"),
  api_key: getEnv("CLOUDINARY_API_KEY"),
  api_secret: getEnv("CLOUDINARY_API_SECRET"),
});

export default cloudinary;
