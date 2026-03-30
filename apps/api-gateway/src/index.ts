import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { logger } from "@ai-code-review-platform/logger";
import { CodeJob } from "@ai-code-review-platform/contracts";
import { randomUUID } from "crypto";
import { createJob, getJob } from "./db";
import { codeQueue } from "@ai-code-review-platform/queue";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.json({ status: "API Gateway running" });
});

app.post("/submit-code", async (req, res) => {
  const { code } = req.body;

  const jobId = randomUUID();

  const job: CodeJob = {
    jobId,
    code,
    status: "pending",
  };

  createJob(job);

  const bullJob = await codeQueue.add("process-code", job, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  });

  codeQueue.getJob(jobId).then((job) => {
    job?.updateData({ ...job.data, queueId: bullJob.id });
  });

  res.json({ jobId, queueId: bullJob.id });
});

app.get("/job/:id", async (req, res) => {
  const job = await codeQueue.getJob(req.params.id);
  console.log("Fetching job from queue with ID:", req.params.id);
  console.log("Fetched job from queue:", job?.id);
  console.log("Job:", job);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const state = await job.getState();

  res.json({
    id: job.id,
    state,
    result: job.returnvalue || null,
    failedReason: job.failedReason || null,
  });
});

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});
