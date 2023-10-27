import express from "express";
import mongoose from "mongoose";

import verifyUser from "../../helpers/verifyUser.js";
import Flow from "../../models/flow.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response500 } from "../../helpers/error-reponse.js";


var router = express.Router();

router.get("/:bot", verifyUser, async function (req, res) {

    const { bot } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bot)) return Response400(res, "Invalid bot id sent");


    try {
        let query = Flow.find({
            bot: bot,
            org: req.user.org,
            active: true
        }).select(['name', 'description', 'status', 'primary']);
        const queryResult = await query.exec();
        return Response200(res, "Flows list", queryResult);
    } catch (error) {
        return Response500(res);
    }

})

export default router;

