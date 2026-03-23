import { subscribe } from "@ai-code-review-platform/event-bus";
import { logger } from "@ai-code-review-platform/logger";
import { EVENTS } from "@ai-code-review-platform/contracts";

console.log("Code Processor Started");

// Graceful error handling (IMPORTANT)
process.on("uncaughtException", (err: any) => {
  logger.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err: any) => {
  logger.error("Unhandled Rejection:", err);
});

// Subscribe to event
subscribe(EVENTS.CODE_SUBMITTED, async (data) => {
  logger.info("Event received: code.submitted");

  try {
    const { code } = data;

    logger.info(`Processing code: ${code}`);

    const result = analyzeCode(code);

    logger.info(`Result: ${result}`);
  } catch (error: any) {
    logger.error("Processing failed:", error);
  }
});

// Fake analyzer (temporary)
function analyzeCode(code: string): string {
  if (!code) return "Empty code";

  if (code.includes("console.log")) {
    return "Remove console.log before production";
  }

  if (code.length < 10) {
    return "Code too short";
  }

  return "Code looks fine";
}