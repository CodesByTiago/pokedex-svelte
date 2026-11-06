import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "../msw/server.js";
import { ApiError, http } from "./http.js";

describe("HTTP client", () => {
  it("uses the configured base URL and returns Axios responses", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon", () =>
        HttpResponse.json({ results: [{ name: "bulbasaur" }] }),
      ),
    );

    const response = await http.get<{ results: { name: string }[] }>("/pokemon");

    expect(response.data.results).toEqual([{ name: "bulbasaur" }]);
  });

  it("normalizes HTTP errors and preserves their status", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/missing", () =>
        HttpResponse.json({ detail: "Not found" }, { status: 404 }),
      ),
    );

    await expect(http.get("/missing")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
    } satisfies Partial<ApiError>);
  });
});
