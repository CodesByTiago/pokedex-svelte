import axios, { type AxiosError } from "axios";
import { PUBLIC_API_URL } from "$app/env/public";

export class ApiError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;

  constructor(error: AxiosError) {
    super(error.message, { cause: error });
    this.name = "ApiError";
    this.status = error.response?.status;
    this.code = error.code;
  }
}

export const http = axios.create({
  baseURL: PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error) || !axios.isAxiosError(error)) {
      throw error;
    }

    throw new ApiError(error);
  },
);
