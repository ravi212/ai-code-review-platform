export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface CodeJob {
  jobId: string;
  code: string;
  status: JobStatus;
  result?: string;
}