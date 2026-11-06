import { afterAll, afterEach, beforeAll } from "vite-plus/test";
import { server } from "../server";

beforeAll(() => {
  server.listen({ onUnhandledFrame: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
