import express from "express";

import createFlow from "./createFlow.js";
import getAllFlows from "./getAllFlows.js";
import getFlowById from "./getFlowById.js";
import updateFlow from "./updateFlow.js";
import deleteFlow from "./deleteFlow.js";


const flowRoutes = express();

flowRoutes.use('/create', createFlow);
flowRoutes.use('/list', getAllFlows);
flowRoutes.use('/get', getFlowById);
flowRoutes.use("/update", updateFlow);
flowRoutes.use("/delete", deleteFlow);

export default flowRoutes;

