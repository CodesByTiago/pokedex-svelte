import { http as mswHttp, HttpResponse } from "msw";
import { describe, expect, it } from "vite-plus/test";
import { server } from "#lib/core/msw/server.js";
import { loadPokemonComparison } from "../server";

function pokemonResponse(id: number, name: string) {
  return {
    id,
    name,
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
          front_default: `https://example.com/${name}.png`,
          front_shiny: null,
        },
      },
    },
  };
}

describe("Pokémon comparison page", () => {
  it("loads both Pokémon and normalizes the search values", async () => {
    const requested: string[] = [];

    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
        const name = String(params.name);
        requested.push(name);
        return HttpResponse.json(pokemonResponse(name === "pikachu" ? 25 : 1, name));
      }),
    );

    const result = await loadPokemonComparison(
      new URL("http://localhost/compare?first=%20Pikachu%20&second=Bulbasaur"),
    );

    expect(requested).toEqual(["pikachu", "bulbasaur"]);
    expect(result).toMatchObject({
      firstQuery: "pikachu",
      secondQuery: "bulbasaur",
      comparison: [
        { id: 25, name: "pikachu" },
        { id: 1, name: "bulbasaur" },
      ],
      notFound: false,
      validationMessage: "",
    });
  });

  it("does not call the repository until both Pokémon are provided", async () => {
    let requestCount = 0;
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
        requestCount += 1;
        return HttpResponse.json(pokemonResponse(25, "pikachu"));
      }),
    );

    await expect(
      loadPokemonComparison(new URL("http://localhost/compare?first=pikachu")),
    ).resolves.toEqual({
      firstQuery: "pikachu",
      secondQuery: "",
      comparison: null,
      notFound: false,
      validationMessage: "",
    });
    expect(requestCount).toBe(0);
  });

  it("returns an empty comparison when a Pokémon is not found", async () => {
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) =>
        params.name === "missingno"
          ? HttpResponse.json({ detail: "Not found." }, { status: 404 })
          : HttpResponse.json(pokemonResponse(25, "pikachu")),
      ),
    );

    await expect(
      loadPokemonComparison(new URL("http://localhost/compare?first=pikachu&second=missingno")),
    ).resolves.toMatchObject({
      comparison: null,
      notFound: true,
      validationMessage: "",
    });
  });

  it("returns an inline validation message when comparison is submitted incomplete", async () => {
    await expect(
      loadPokemonComparison(new URL("http://localhost/compare?first=pikachu&compare=true")),
    ).resolves.toEqual({
      firstQuery: "pikachu",
      secondQuery: "",
      comparison: null,
      notFound: false,
      validationMessage: "Preencha os dois campos para comparar os Pokémon.",
    });
  });

  it("clears the first Pokémon and retains the second", async () => {
    await expect(
      loadPokemonComparison(
        new URL("http://localhost/compare?first=pikachu&second=bulbasaur&clear=first&compare=true"),
      ),
    ).resolves.toEqual({
      firstQuery: "",
      secondQuery: "bulbasaur",
      comparison: null,
      notFound: false,
      validationMessage: "",
    });
  });

  it("clears the only selected Pokémon without requiring the other field", async () => {
    await expect(
      loadPokemonComparison(new URL("http://localhost/compare?first=pikachu&clear=first")),
    ).resolves.toEqual({
      firstQuery: "",
      secondQuery: "",
      comparison: null,
      notFound: false,
      validationMessage: "",
    });
  });

  it("clears both Pokémon without validating or loading a comparison", async () => {
    let requestCount = 0;
    server.use(
      mswHttp.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
        requestCount += 1;
        return HttpResponse.json(pokemonResponse(25, "pikachu"));
      }),
    );

    await expect(
      loadPokemonComparison(
        new URL("http://localhost/compare?first=pikachu&second=bulbasaur&clear=all&compare=true"),
      ),
    ).resolves.toEqual({
      firstQuery: "",
      secondQuery: "",
      comparison: null,
      notFound: false,
      validationMessage: "",
    });
    expect(requestCount).toBe(0);
  });
});
