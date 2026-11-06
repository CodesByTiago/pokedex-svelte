import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "./server";

describe("MSW server", () => {
  it("intercepts HTTP requests in tests", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon", () => HttpResponse.json({ results: [] })),
    );

    const response = await fetch("https://pokeapi.co/api/v2/pokemon");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ results: [] });
  });
});
