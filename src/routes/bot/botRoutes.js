import express from "express";

import createBot from './createBot.js';
import getAllBots from './getAllBot.js';
import getAllBotTemplates from "./getAllBotTemplates.js";
import getBotById from './getBotById.js';
import updateBotSettings from './updateBotSettings.js';
import updateBotStatus from './updateBotStatus.js';
import updateBotStyles from './updateBotStyles.js';
import connect360Dialog from './connectDialog360.js';
import deleteBot from './deleteBot.js';
import botCategories from './botCategories.js';
import createBotFromTemplate from './createBotFromTemplate.js';


const botRoutes = express();

botRoutes.use("/categories", botCategories);
botRoutes.use("/create", createBot);
botRoutes.use("/create-from-template", createBotFromTemplate);
botRoutes.use("/list", getAllBots);
botRoutes.use("/list-templates", getAllBotTemplates);
botRoutes.use("/get", getBotById);
botRoutes.use("/delete", deleteBot);
botRoutes.use("/update", updateBotSettings);
botRoutes.use("/update/status", updateBotStatus);
botRoutes.use("/update/styles", updateBotStyles);
botRoutes.use("/update/connect-dialog-360", connect360Dialog);

export default botRoutes;

