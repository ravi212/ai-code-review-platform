import { Worker, Queue } from "bullmq";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const QUEUE_NAME = "code-review";

export const codeQueue = new Queue(QUEUE_NAME, {
  connection,
});

export const createWorker = (processor: (job: any) => Promise<any>) => {
  const worker = new Worker(QUEUE_NAME, processor, {
    connection, 
    concurrency: 5, // process up to 5 jobs in parallel
  });

  worker.on("completed", (job) => {
    console.log(`✅ Job completed: ${job.id}`);
  });

  worker.on("failed", (job, err) => {
    console.error(`❌ Job failed: ${job?.id}`, err);
  });

  return worker;
};