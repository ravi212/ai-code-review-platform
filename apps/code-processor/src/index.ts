import { logger } from "@ai-code-review-platform/logger";
import { CodeJob } from "@ai-code-review-platform/contracts";
import { createWorker } from "@ai-code-review-platform/queue";
console.log("Code Processor Started");

// Graceful error handling
process.on("uncaughtException", (err: any) => {
  logger.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err: any) => {
  logger.error("Unhandled Rejection:", err);
});

createWorker(async (job: any) => {
  console.log("Processing job inside create worker fn:", job.id);
  const data = job.data as CodeJob;

  logger.info(`📥 Processing job ${data.jobId}`);

  try {
    const result = analyzeCode(data.code);

    logger.info(`Completed job ${data.jobId}`);

    return {
      status: "completed",
      result,
    };

  } catch (err) {
    logger.error(`Failed job ${data.jobId}`);
    throw err; // triggers retry
  }
});

function analyzeCode(code: string): string {
  if (code.includes("console.log")) {
    return "Remove console.log";
  }
  return "Clean code";
}