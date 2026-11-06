import { describe, expect, it } from "vite-plus/test";
import {
  getCatalogHref,
  getComparisonHref,
  getPokemonDetailHref,
  selectPokemonForComparison,
} from "./pokemonComparison";

describe("Pokémon comparison navigation", () => {
  it("selects the first Pokémon, then fills the second slot", () => {
    expect(selectPokemonForComparison("", "", "Pikachu")).toEqual({
      first: "pikachu",
      second: "",
    });
    expect(selectPokemonForComparison("pikachu", "", "Bulbasaur")).toEqual({
      first: "pikachu",
      second: "bulbasaur",
    });
  });

  it("keeps an existing pair when selecting either member and starts a new pair for another", () => {
    expect(selectPokemonForComparison("pikachu", "bulbasaur", "Pikachu")).toEqual({
      first: "pikachu",
      second: "bulbasaur",
    });
    expect(selectPokemonForComparison("pikachu", "bulbasaur", "charmander")).toEqual({
      first: "charmander",
      second: "",
    });
  });

  it("preserves selections in comparison, catalog, and detail links", () => {
    expect(getComparisonHref("pikachu", "", "Bulbasaur")).toBe(
      "/compare?first=pikachu&second=bulbasaur",
    );
    expect(getCatalogHref("pikachu", "bulbasaur")).toBe(
      "/?compareFirst=pikachu&compareSecond=bulbasaur",
    );
    expect(getPokemonDetailHref(25, "pikachu", "")).toBe("/pokemon/25?compareFirst=pikachu");
  });
});
