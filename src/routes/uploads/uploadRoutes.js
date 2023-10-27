import express from "express";
import uploadImage from "./uploadImage.js";
import uploadAudio from "./uploadAudio.js";
import uploadVideo from "./uploadVideo.js";
import uploadDocument from "./uploadDocument.js";

const uploadRoutes = express();

uploadRoutes.use("/image", uploadImage);
uploadRoutes.use("/audio", uploadAudio);
uploadRoutes.use("/video", uploadVideo);
uploadRoutes.use("/document", uploadDocument);

export default uploadRoutes;
