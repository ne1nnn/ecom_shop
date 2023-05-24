export interface IResponseAPI {
  status: 0 | 1 | -1;
  message: string;
  data?: any | null;
  error?: string | null;
}
