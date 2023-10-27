import express from "express";
import verifyUser from "../../helpers/verifyUser.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response500 } from "../../helpers/error-reponse.js";

var router = express.Router();

router.get("/", verifyUser, async function (req, res) {
  try {
    let query = Bot.find({
      location: req.user.org,
      active: true,
      is_template: false,
    }).select(["name", "description", "status", "channel"]);
    const queryResult = await query.exec();
    return Response200(res, "Bots list", queryResult);
  } catch (error) {
    return Response500(res);
  }
});

export default router;
