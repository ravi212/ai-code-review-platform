import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { publish } from "@ai-code-review-platform/event-bus";
import { logger } from "@ai-code-review-platform/logger";
import { CodeJob, EVENTS } from "@ai-code-review-platform/contracts";
import { randomUUID } from "crypto";
import { createJob, getJob } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.json({ status: "API Gateway running" });
});

app.post("/submit-code", (req, res) => {
  const { code } = req.body;

  const jobId = randomUUID();

  const job: CodeJob = {
    jobId,
    code,
    status: "pending",
  };

  createJob(job);

  publish(EVENTS.CODE_SUBMITTED, job);

  res.json({ jobId });
});

app.get("/job/:id", (req, res) => {
  const job = getJob(req.params.id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
});

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});