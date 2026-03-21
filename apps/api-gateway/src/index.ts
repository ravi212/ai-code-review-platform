import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { publish } from "@ai-code-review-platform/event-bus";
import { logger } from "@ai-code-review-platform/logger";
import { EVENTS } from "@ai-code-review-platform/contracts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.json({ status: "API Gateway running" });
});

app.post("/submit-code", async (req, res) => {
  const payload = req.body;

  await publish(EVENTS.CODE_SUBMITTED, payload);

  logger.info("Code submitted event published");

  res.json({ status: "queued" });
});

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});