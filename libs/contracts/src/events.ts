export enum EVENTS {
  CODE_SUBMITTED = "code.submitted",
  REVIEW_COMPLETED = "review.completed",
  CODE_PROCESSED = "code.processed"
}

export interface CodeSubmittedEvent {
  code: string;
  provider: string;
  correlationId: string;
}