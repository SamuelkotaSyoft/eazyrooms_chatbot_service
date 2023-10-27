import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Response200 } from "../../helpers/success-response.js";
import { Response400 } from "../../helpers/error-reponse.js";

const router = express.Router();

// Set maximum file size (in bytes)
const maxFileSize = 16 * 1024 * 1024; // 16MB

// Set allowed file types
const allowedFileTypes = [
  "audio/x-aac",
  "audio/aac",
  "audio/vnd.dlna.adts",
  "audio/ac3",
  "audio/x-ac3",
  "audio/vnd.dolby.dd-raw",
  "audio/mp3",
  "audio/mpeg",
];

// // Create a multer storage
const storage = multer.memoryStorage();

// Create a multer instance with the storage and file size restrictions
const upload = multer({
  storage,
});

// Route for handling file upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Configure AWS SDK with your credentials
    const s3Client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
      },
    });

    const file = req.file;

    // Check if file exists
    if (!file) {
      return Response400(res, "No file uploaded");
    }

    // Check file size
    if (file.size > maxFileSize) {
      return Response400(res, "File size exceeds the maximum limit 10MB");
    }

    // Check file type
    if (!allowedFileTypes.includes(file.mimetype)) {
      return Response400(
        res,
        "File type not allowed. Only aac, mpeg, mp3 allowed"
      );
    }

    // Generate a unique key for the file
    const key = `uploads/${Date.now()}_${file.originalname}`;

    // Create the PutObject command
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file?.mimetype,
    });

    // Upload the file to S3
    await s3Client.send(command);
    const publicUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;

    return Response200(res, "File uploaded successfully", { url: publicUrl });
  } catch (error) {
    res.status(500).send("Error uploading file");
  }
});

export default router;
