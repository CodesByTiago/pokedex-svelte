import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "#lib/core/msw/server.js";
import { getPokemonByNameOrId, getPokemonPage, getPokemonSuggestions } from "./pokemon";

describe("Pokémon API", () => {
  it("maps a paginated list to summaries with artwork URLs", async () => {
    let requestUrl: URL | undefined;

    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
        requestUrl = new URL(request.url);
        return HttpResponse.json({
          count: 2,
          results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
        });
      }),
    );

    const result = await getPokemonPage(24, 1);

    expect(requestUrl?.searchParams.get("offset")).toBe("24");
    expect(requestUrl?.searchParams.get("limit")).toBe("1");
    expect(result).toEqual({
      total: 2,
      pokemon: [
        {
          id: 1,
          name: "bulbasaur",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      ],
    });
  });

  it("maps Pokémon details into the domain model", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/pikachu", () =>
        HttpResponse.json({
          id: 25,
          name: "pikachu",
          height: 4,
          weight: 60,
          types: [{ type: { name: "electric" } }],
          abilities: [{ ability: { name: "static" } }],
          stats: [{ base_stat: 35, stat: { name: "hp" } }],
          sprites: {
            front_default: null,
            front_shiny: null,
            other: {
              "official-artwork": {
                front_default: "https://example.com/pikachu.png",
                front_shiny: "https://example.com/pikachu-shiny.png",
              },
            },
          },
        }),
      ),
    );

    await expect(getPokemonByNameOrId("pikachu")).resolves.toMatchObject({
      id: 25,
      name: "pikachu",
      height: 4,
      weight: 60,
      types: ["electric"],
      abilities: ["static"],
      stats: [{ name: "hp", value: 35 }],
      artwork: "https://example.com/pikachu.png",
      shinyArtwork: "https://example.com/pikachu-shiny.png",
    });
  });

  it("does not fetch suggestions for a single letter", async () => {
    let requestCount = 0;
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon", () => {
        requestCount += 1;
        return HttpResponse.json({ count: 0, results: [] });
      }),
    );

    await expect(getPokemonSuggestions(" p ")).resolves.toEqual([]);
    expect(requestCount).toBe(0);
  });

  it("returns ranked name and number suggestions using a cached index", async () => {
    let requestCount = 0;
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
        requestCount += 1;
        const { searchParams } = new URL(request.url);

        if (searchParams.get("limit") === "1") {
          return HttpResponse.json({ count: 4, results: [] });
        }

        return HttpResponse.json({
          count: 4,
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
            { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
            { name: "raichu", url: "https://pokeapi.co/api/v2/pokemon/26/" },
          ],
        });
      }),
    );

    await expect(getPokemonSuggestions("PIK")).resolves.toMatchObject([
      { id: 25, name: "pikachu" },
    ]);
    const numberSuggestions = await getPokemonSuggestions("1");
    expect(numberSuggestions[0]).toMatchObject({ id: 1, name: "bulbasaur" });
    await expect(getPokemonSuggestions("25")).resolves.toMatchObject([{ id: 25, name: "pikachu" }]);
    expect(requestCount).toBe(2);
  });
});
