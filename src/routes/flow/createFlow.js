import express from "express";
import mongoose from "mongoose";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Flow from "../../models/flow.model.js";
import Bot from "../../models/bot.model.js";

import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";
import { Response201 } from "../../helpers/success-response.js";

var router = express.Router();


router.post("/", verifyUser, validator(["name", "description", "bot", "nodes", "edges"]), async function (req, res) {
    try {

        const { name, description, bot, nodes, edges } = req.body;
        const { id, org } = req.user;

        if (!mongoose.Types.ObjectId.isValid(bot)) return Response400(res, "Invalid bot id sent");

        const checkBot = await Bot.find({ _id: bot, org: org, active: true, is_template: false });
        if (checkBot.length === 0) return Response404(res, "No bot found");

        const checkFlow = await Flow.find({ name: name, bot: bot, active: true, org: org }).count().exec();
        if (checkFlow !== 0) return Response400(res, "Flow with name already exists");

        try {
            const flow = await new Flow({
                name: name,
                description: description,
                nodes: nodes,
                edges: edges,
                bot: checkBot[0]._id,
                org: org,
                created_by: id,
                updated_by: id
            }).save();

            return Response201(res, "Flow created successfully", flow);
        } catch (err) {
            return Response400(res, "Invalid data sent");
        }
    } catch (error) {
        return Response500(res);
    }
})

export default router;