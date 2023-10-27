import express from 'express';
import botRoutes from './bot/botRoutes.js';
import flowRoutes from './flow/flowRoutes.js';
import uploadRoutes from './uploads/uploadRoutes.js';

const routes = express();

routes.use('/chatbot', botRoutes);
routes.use('/flow', flowRoutes);
routes.use('/upload', uploadRoutes);

export default routes;