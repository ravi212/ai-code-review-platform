import { CodeJob } from "@ai-code-review-platform/contracts";

const jobs = new Map<string, CodeJob>();

export const createJob = (job: CodeJob) => {
  jobs.set(job.jobId, job);
};

export const updateJob = (jobId: string, update: Partial<CodeJob>) => {
  const job = jobs.get(jobId);
  if (!job) return;

  jobs.set(jobId, { ...job, ...update });
};

export const getJob = (jobId: string) => {
  return jobs.get(jobId);
};