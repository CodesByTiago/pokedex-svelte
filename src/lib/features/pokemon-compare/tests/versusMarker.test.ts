import { render } from "svelte/server";
import { describe, expect, it } from "vite-plus/test";
import type { PokemonDetails } from "#lib/shared/models/pokemon.js";
import PokemonCompareView from "../components/PokemonCompareView/PokemonCompareView.svelte";
import VersusMarker from "../components/VersusMarker/VersusMarker.svelte";

const createPokemon = (id: number, name: string): PokemonDetails => ({
  id,
  name,
  image: null,
  height: 10,
  weight: 100,
  types: ["electric"],
  abilities: ["static"],
  stats: [{ name: "hp", value: 50 }],
  artwork: `https://example.test/${name}.png`,
  shinyArtwork: null,
});

const baseProps = {
  firstQuery: "pikachu",
  secondQuery: "charizard",
  notFound: false,
  validationMessage: "",
};

describe("VersusMarker", () => {
  it("exposes an accessible image named versus with the VS text", () => {
    const { body } = render(VersusMarker);

    expect(body).toMatch(/<svg[^>]*role="img"[^>]*aria-label="versus"/);
    expect(body).toContain("VS");
  });
});

describe("PokemonCompareView versus marker", () => {
  it("renders a single marker between the two Pokémon cards", () => {
    const { body } = render(PokemonCompareView, {
      props: {
        ...baseProps,
        comparison: [createPokemon(25, "pikachu"), createPokemon(6, "charizard")],
      },
    });

    expect(body.match(/aria-label="versus"/g)).toHaveLength(1);

    const firstCard = body.indexOf("pikachu</h2>");
    const marker = body.indexOf('aria-label="versus"');
    const secondCard = body.indexOf("charizard</h2>");

    expect(firstCard).toBeGreaterThan(-1);
    expect(marker).toBeGreaterThan(firstCard);
    expect(secondCard).toBeGreaterThan(marker);
  });

  it("does not render the marker when there is no comparison", () => {
    const { body } = render(PokemonCompareView, {
      props: { ...baseProps, comparison: null },
    });

    expect(body).not.toContain('aria-label="versus"');
  });
});
