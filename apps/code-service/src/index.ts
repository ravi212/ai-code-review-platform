import { publish, subscribe } from "@ai-code-review-platform/event-bus";
import { logger } from "@ai-code-review-platform/logger";
import { CodeJob, EVENTS } from "@ai-code-review-platform/contracts";

console.log("Code Processor Started");

// Graceful error handling
process.on("uncaughtException", (err: any) => {
  logger.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err: any) => {
  logger.error("Unhandled Rejection:", err);
});

subscribe(EVENTS.CODE_SUBMITTED, async (job: CodeJob) => {
  logger.info(`📥 Job received: ${job.jobId}`);

  try {
    // mark processing
    publish(EVENTS.CODE_PROCESSED, {
      jobId: job.jobId,
      status: "processing"
    });

    const result = analyzeCode(job.code);

    publish(EVENTS.CODE_PROCESSED, {
      jobId: job.jobId,
      status: "completed",
      result
    });

  } catch (err) {
    publish(EVENTS.CODE_PROCESSED, {
      jobId: job.jobId,
      status: "failed"
    });
  }
});

function analyzeCode(code: string): string {
  if (code.includes("console.log")) {
    return "Remove console.log";
  }
  return "Clean code";
}