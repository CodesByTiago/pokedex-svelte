import { describe, expect, it } from "vite-plus/test";
import type { PokemonComparisonState } from "../state.js";
import { resolvePokemonComparisonState } from "../state.js";

const loadedState: PokemonComparisonState = {
  firstQuery: "",
  secondQuery: "",
  comparison: null,
  notFound: false,
  validationMessage: "",
};

const savedState: PokemonComparisonState = {
  firstQuery: "pikachu",
  secondQuery: "bulbasaur",
  comparison: null,
  notFound: false,
  validationMessage: "",
};

describe("resolvePokemonComparisonState", () => {
  it("restores the saved comparison when returning to a query-free page", () => {
    expect(resolvePokemonComparisonState(loadedState, savedState, false)).toBe(savedState);
  });

  it("prefers newly loaded query data over previously saved state", () => {
    expect(resolvePokemonComparisonState(loadedState, savedState, true)).toBe(loadedState);
  });

  it("uses the loaded state when there is no saved comparison", () => {
    expect(resolvePokemonComparisonState(loadedState, undefined, false)).toBe(loadedState);
  });
});
