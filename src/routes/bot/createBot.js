import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Bot from "../../models/bot.model.js";
import Flow from "../../models/flow.model.js";
import { Response400, Response500 } from "../../helpers/error-reponse.js";
import { Response201 } from "../../helpers/success-response.js";

var router = express.Router();

router.post(
  "/",
  verifyUser,
  validator(["name", "description", "channel"]),
  async function (req, res) {
    try {
      const { name, description, channel } = req.body;
      const { id, org } = req.user;

      const checkBot = await Bot.find({ name: name, active: true, org: org })
        .count()
        .exec();
      if (checkBot !== 0)
        return Response400(res, "Bot With Name already exists");

      try {
        const chatbot = await new Bot({
          name: name,
          description: description,
          channel: channel,
          org: org,
          created_by: id,
          updated_by: id,
        }).save();

        const flow = await new Flow({
          name: "Main",
          primary: true,
          bot: chatbot._id,
          org: org,
          nodes: [
            {
              id: "mybot-0",
              type: "startNode",
              position: { x: 100, y: 100 },
              data: {
                id: "startNode",
              },
            },
          ],
          edges: [],
          created_by: id,
          updated_by: id,
        }).save();

        chatbot.primary_flow = flow._id;
        chatbot.save();

        return Response201(res, "Bot Created Successfully", chatbot);
      } catch (err) {
        return Response400(res, "Invalid data sent");
      }
    } catch (error) {
      return Response500(res);
    }
  }
);

export default router;
