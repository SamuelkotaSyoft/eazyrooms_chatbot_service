import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import Flow from "../../models/flow.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";


var router = express.Router();

router.get("/:flowId", verifyUser, async function (req, res) {
    try {
        const { flowId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(flowId)) return Response400(res, "Invalid flow id sent");

        let query = Flow.findOne({
            _id: flowId,
            org: req.user.org,
            active: true
        }).select(['-created_by', '-updated_by', '-org', '-active']);
        const queryResult = await query.exec();
        if (queryResult) {
            return Response200(res, "Flow details", queryResult)
        } else {
            return Response404(res, "Invalid flow id sent");
        }
    } catch (error) {
        return Response500(res);
    }
})

export default router;

