import express from "express";
import mongoose from "mongoose";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Bot from "../../models/bot.model.js";
import Flow from "../../models/flow.model.js";
import { Response400, Response500 } from "../../helpers/error-reponse.js";
import { Response201 } from "../../helpers/success-response.js";

var router = express.Router();

router.post("/", verifyUser, validator(["name", "description", "template"]), async function (req, res) {
    try {
        const { name, description, template } = req.body;
        const { id, org } = req.user;

        const checkBot = await Bot.find({ name: name, active: true, org: org }).count().exec();
        if (checkBot !== 0) return Response400(res, "Bot With Name already exists");

        if (!mongoose.Types.ObjectId.isValid(template)) return Response400(res, "Invalid template id sent");
        const templateBot = await Bot.find({ _id: template, active: true });

        try {
            const chatbot = await new Bot({
                name: name,
                description: description,
                channel: templateBot.channel,
                org: org,
                created_by: id,
                updated_by: id
            }).save();

            const flows = await Flow.find({
                bot: template,
                active: true
            });

            flows.forEach(async (item) => {
                await new Flow({
                    name: item.name,
                    primary: item.primary,
                    bot: chatbot._id,
                    org: org,
                    nodes: item.nodes,
                    edges: item.edges,
                    created_by: id,
                    updated_by: id
                }).save();
            })

            return Response201(res, "Bot Created Successfully", chatbot);
        } catch (err) {
            return Response400(res, "Invalid data sent");
        }

    } catch (error) {
        return Response500(res);
    }
});


export default router;
