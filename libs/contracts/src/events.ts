export enum EVENTS {
  CODE_SUBMITTED = "code.submitted",
  REVIEW_COMPLETED = "review.completed",
}

export interface CodeSubmittedEvent {
  code: string;
  provider: string;
  correlationId: string;
}