import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import Flow from "../../models/flow.model.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";

var router = express.Router();

router.delete("/:flowId", verifyUser, async function (req, res) {
    const { flowId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(flowId)) return Response400(res, "Invalid flow id sent");

    let checkPrimaryFlow = await Flow.find({
        _id: flowId,
        org: req.user.org,
        active: true,
        primary: true,
    }).count().exec();
    if (checkPrimaryFlow !== 0) return Response400(res, "Primary flow can't be deleted");

    const flow = await Flow.findOne(
        {
            _id: flowId,
            org: req.user.org,
            active: true,
        },
    )
    const checkBot = await Bot.find({ _id: flow?.bot, org: req.user.org, active: true, is_template: true });
    if (checkBot.length !== 0) return Response404(res, "You can't delete template flows");

    try {
        const flow = await Flow.findOneAndUpdate(
            {
                _id: flowId,
                org: req.user.org,
                active: true
            },
            {
                $set: {
                    active: false,
                    updated_by: req.user.id
                }
            },
            { new: true }
        );
        if (flow) {

            return Response200(res, "Chat flow deleted successfully");
        } else {
            return Response400(res, "Invalid flow id sent");
        }
    } catch (error) {
        return Response400(res, "Invalid data sent");
    }
})

export default router;