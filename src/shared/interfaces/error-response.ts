export interface ErrorResponse {
  message: string;
  details?: Record<string, unknown>;
  name: string;
}

export interface StripeError {
  type: string;
  code: string;
  message: string;
}