import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import { Response400, Response500 } from "../../helpers/error-reponse.js";
import { encryptRSA } from "../../helpers/rsa.js";
import { Response200 } from "../../helpers/success-response.js";
import validator from "../../helpers/validator.js";
import verifyUser from "../../helpers/verifyUser.js";
import Bot from "../../models/bot.model.js";

const router = express.Router();

router.post(
  "/:botId",
  verifyUser,
  validator(["api_key"]),
  async function (req, res) {
    try {
      const { botId } = req.params;
      const { api_key } = req.body;
      if (!mongoose.Types.ObjectId.isValid(botId))
        return Response400(res, "Invalid id sent");

      let query = await Bot.findOne({
        _id: botId,
        // org: req.user.org,
        active: true,
      })
        .select([
          "-created_by",
          "-updated_by",
          "-org",
          "-active",
          "-api_key",
          "-is_template",
        ])
        .exec();
      if (!query) return Response400(res, "Invalid bot id sent");

      //[UNCOMMENT]: In Live for testing commented this code

      const url = process.env.DIALOG360;
      const payload = {
        url: process.env.WEBHOOK_URL,
        headers: {
          org: req.user.org,
          botid: botId,
        },
      };
      console.log({ payload });
      const headers = {
        "D360-API-KEY": api_key,
      };
      let dialog_360_response;
      try {
        dialog_360_response = await axios.post(url, payload, { headers });
      } catch (err) {
        console.log(err);
        return Response400(res, "Invalid API Key sent");
      }

      const bot = await Bot.findOneAndUpdate(
        {
          _id: botId,
          active: true,
        },
        {
          $set: {
            api_key: encryptRSA(api_key),
            key_type: "DIALOG360API",
            org: req.user.org,
            updated_by: req.user.id,
          },
        },
        { new: true }
      );

      // console.log(decryptRSA(bot.api_key));

      return Response200(res, "Key added successfully");
    } catch (error) {
      return Response500(res);
    }
  }
);

export default router;
