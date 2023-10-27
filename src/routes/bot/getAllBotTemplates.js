import express from "express";
import verifyUser from "../../helpers/verifyUser.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response500 } from "../../helpers/error-reponse.js";


var router = express.Router();

router.get("/", verifyUser, async function (req, res) {
    try {
        const { id } = req.query;
        let select_json = {
            org: req.user.org,
            active: true,
            is_template: true,
        }
        if(id) select_json.template_category = id

        let query = Bot.find(select_json).select(['name', 'description', 'status', 'channel']);
        const queryResult = await query.exec();
        return Response200(res, "Bots list", queryResult);
    } catch (error) {
        return Response500(res);
    }
})

export default router;

