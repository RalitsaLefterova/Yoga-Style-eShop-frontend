export interface ErrorResponse {
  message: string;
  details?: Record<string, unknown>;
  name: string;
}