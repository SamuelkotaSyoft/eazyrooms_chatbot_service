import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Flow from "../../models/flow.model.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";

var router = express.Router();

router.put("/:flowId", verifyUser, validator(['name', 'description', 'nodes', 'edges']), async function (req, res) {
    try {
        const { flowId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(flowId)) return Response400(res, "Invalid flow id sent");

        const flow = await Flow.findOne(
            {
                _id: flowId,
                org: req.user.org,
                active: true,
            },
        )
        const checkBot = await Bot.find({ _id: flow.bot, org: req.user.org, active: true, is_template: true });
        if (checkBot.length !== 0) return Response404(res, "You can't delete template flows");

        const {
            name,
            description,
            nodes,
            edges
        } = req.body

        try {
            const flow = await Flow.findOneAndUpdate(
                {
                    _id: flowId,
                    org: req.user.org,
                    active: true
                },
                {
                    $set: {
                        name,
                        description,
                        nodes,
                        edges,
                        updated_by: req.user.id
                    }
                },
                { new: true }
            ).select(["-created_by", "-updated_by", "-org", "-active"]);
            if (flow) {
                return Response200(res, "Flow updated successfully", flow)
            } else {
                return Response404(res, "Invalid flow id sent");
            }
        } catch (error) {
            return Response400(res, "Invalid data sent");
        }
    } catch (error) {
        Response500(res)
    }
})

export default router;