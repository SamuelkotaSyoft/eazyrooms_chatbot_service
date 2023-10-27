import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";


var router = express.Router();

router.get("/:botId", verifyUser, async function (req, res) {
    try {
        const { botId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(botId)) return Response400(res, "Invalid id sent");

        let query = Bot.findOne({
            _id: botId,
            org: req.user.org,
            active: true
        }).select(['-created_by', '-updated_by', '-org', '-active', '-api_key']);
        const queryResult = await query.exec();
        if (queryResult) {
            return Response200(res, "Chat bot details", queryResult)
        } else {
            return Response404(res, "Invalid id sent");
        }
    } catch (error) {
        return Response500(res);
    }
})

export default router;

