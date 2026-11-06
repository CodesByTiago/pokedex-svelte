import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "#lib/core/msw/server.js";
import { loadPokemonDetail } from "../server";

describe("Pokémon detail page", () => {
  it("loads a Pokémon by numeric ID", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/25", () =>
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
                front_shiny: null,
              },
            },
          },
        }),
      ),
    );

    await expect(
      loadPokemonDetail("25", new URL("http://localhost/pokemon/25?compareFirst=eevee")),
    ).resolves.toMatchObject({
      pokemon: { id: 25, name: "pikachu", types: ["electric"] },
      compareFirst: "eevee",
      compareSecond: "",
    });
  });
});
