import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import { Response404 } from "./helpers/error-reponse.js";

const app = express();
// const router = express.Router();

app.use(cors());
app.use(express.json());

app.get("/ping", (_, res) => {
  res.send({ status: "ok" });
});

app.use("/bot/api", routes);

// For invalid routes
app.all("*", (_, res) => {
  return Response404(res, "No matching URL found");
});

export default app;
