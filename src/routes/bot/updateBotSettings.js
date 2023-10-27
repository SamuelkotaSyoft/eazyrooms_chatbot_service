import mongoose from "mongoose";
import express from "express";

import verifyUser from "../../helpers/verifyUser.js";
import validator from "../../helpers/validator.js";
import Bot from "../../models/bot.model.js";
import { Response200 } from "../../helpers/success-response.js";
import { Response400, Response404, Response500 } from "../../helpers/error-reponse.js";

var router = express.Router();

router.put(
    "/:botId",
    verifyUser,
    validator(['name', 'description', 'restart_cmd', 'end_cmd', 'info']),
    async function (req, res) {
        try {
            const { botId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(botId)) return Response400(res, "Invalid id sent");
            const {
                name,
                description,
                restart_cmd,
                end_cmd,
                info
            } = req.body

            let chatbot;
            try {
                chatbot = await Bot.findOneAndUpdate(
                    {
                        _id: botId,
                        org: req.user.org,
                        active: true,
                        is_template: false
                    },
                    {
                        $set: {
                            name,
                            description,
                            restart_cmd,
                            end_cmd,
                            info,
                            updated_by: req.user.id
                        }
                    },
                    { new: true }
                ).select(["-created_by", "-updated_by", "-org", "-active", "-api_key", "-is_template"]);
            } catch (error) {
                return Response400(res, "Invalid data sent");
            }

            if (chatbot) {
                return Response200(res, "Chat bot updated successfully", chatbot)
            } else {
                return Response404(res, "Invalid id sent");
            }
        } catch (error) {
            return Response500(res, "Invalid data sent");
        }
    })

export default router;