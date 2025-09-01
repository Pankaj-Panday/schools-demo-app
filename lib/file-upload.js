import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      upload_preset: "reno-app",
      use_filename: true,
      resource_type: "image",
    });
    return response;
  } catch (err) {
    console.error("Error Uploading file", err);
    return null;
  }
};
