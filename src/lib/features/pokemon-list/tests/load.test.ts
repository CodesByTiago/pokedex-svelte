import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "#lib/core/msw/server.js";
import { loadPokemonList } from "../server";

describe("Pokémon list page", () => {
  it("loads the requested page and clamps pages beyond the catalog", async () => {
    const requestOffsets: string[] = [];

    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
        requestOffsets.push(new URL(request.url).searchParams.get("offset") ?? "");
        return HttpResponse.json({
          count: 25,
          results: [{ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }],
        });
      }),
    );

    const result = await loadPokemonList(new URL("http://localhost/?page=8"));

    expect(requestOffsets).toEqual(["168", "24"]);
    expect(result).toMatchObject({
      pokemon: [{ id: 25, name: "pikachu" }],
      page: 2,
      totalPages: 2,
      total: 25,
    });
  });

  it("returns an empty result for a search that does not match", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/missingno", () =>
        HttpResponse.json({ detail: "Not found." }, { status: 404 }),
      ),
    );

    await expect(loadPokemonList(new URL("http://localhost/?q=missingno"))).resolves.toEqual({
      pokemon: [],
      query: "missingno",
      page: 1,
      totalPages: 1,
      total: 0,
      compareFirst: "",
      compareSecond: "",
    });
  });
});
