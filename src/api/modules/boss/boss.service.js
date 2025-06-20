import cloudinary from "../../../configs/cloudinary";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const uploadMediaToCloudinary = async (
  fileBuffer,
  originalname,
  folderName = "noname"
) => {
  if (!cloudinary.config().api_key || !cloudinary.config().api_secret) {
    throw new Error("Cloudinary is not properly configured");
  }

  const normalizedFolder = folderName.replace(/[^\w-]/g, "");
  const ext = path.extname(originalname).toLowerCase();
  const resource_type = /\.(mp4|avi|mov|webm)$/.test(ext) ? "video" : "image";
  const public_id = uuidv4();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: normalizedFolder,
        public_id,
        resource_type,
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Failed:", error);
          return reject(error);
        }

        return resolve({
          public_id: result.public_id,
          url: result.secure_url,
          resource_type: result.resource_type,
          folder: normalizedFolder,
          original_name: originalname,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};


export const deleteMedia = async (publicId, resourceType = 'image') => {
  if (!cloudinary.config().api_key || !cloudinary.config().api_secret) {
    throw new Error("Cloudinary is not properly configured");
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Delete Failed:", error);
          return reject(error);
        }

        if (result.result !== 'ok' && result.result !== 'not found') {
          console.warn("⚠️ Unexpected Cloudinary response:", result);
        }

        return resolve(result);
      }
    );
  });
};