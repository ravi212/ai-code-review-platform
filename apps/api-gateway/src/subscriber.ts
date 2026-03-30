import { subscribe } from "@ai-code-review-platform/event-bus";
import { EVENTS } from "@ai-code-review-platform/contracts";
import { updateJob } from "./db";

subscribe(EVENTS.CODE_PROCESSED, (data) => {
  const { jobId, status, result } = data;

  updateJob(jobId, { status, result });

  console.log(`🔄 Job Updated: ${jobId} → ${status}`);
});