import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404 } from "../../helpers/error-reponse.js";

var router = express.Router();

router.put("/:botId", verifyUser, validator(['status']), async function (req, res) {
    const { botId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(botId)) return Response400(res, "Invalid id sent");

    const { status } = req.body

    try {
        const chatbot = await Bot.findOneAndUpdate(
            {
                _id: botId,
                org: req.user.org,
                active: true,
                is_template: false
            },
            {
                $set: {
                    status,
                    updated_by: req.user.id
                }
            },
            { new: true }
        );
        if (chatbot) {
            return Response200(res, "Chat bot status updated successfully")
        } else {
            return Response404(res, "Invalid id sent");
        }
    } catch (error) {
        return Response400(res, "Invalid data sent");
    }
})

export default router;