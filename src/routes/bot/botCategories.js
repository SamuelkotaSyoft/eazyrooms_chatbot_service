import express from "express";
import { Response200 } from "../../helpers/success-response.js";
import verifyUser from "../../helpers/verifyUser.js";


var router = express.Router();

router.get("/", verifyUser, async function (req, res) {
    const templates = [
        {
            id: "MARKETING",
            name: "Marketing"
        },

        {
            id: "SALES",
            name: "Sales"
        },
        {
            id: "INFORMATION",
            name: "Information"
        },  
        {
            id: "SUPPORT",
            name: "Support"
        }
    ]
    return Response200(res, "Bot template categories list", templates);
});

export default router;