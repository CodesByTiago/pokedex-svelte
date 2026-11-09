import { getContext } from "svelte";
import type { PokemonDetails } from "#lib/shared/models/pokemon.js";

export interface PokemonComparisonState {
  firstQuery: string;
  secondQuery: string;
  comparison: [PokemonDetails, PokemonDetails] | null;
  notFound: boolean;
  validationMessage: string;
}

interface PokemonComparisonStore {
  current: PokemonComparisonState | null;
  set: (state: PokemonComparisonState) => void;
  clear: () => void;
}

const POKEMON_COMPARISON_CONTEXT = "pokemon-comparison";

export function createPokemonComparisonStore(): PokemonComparisonStore {
  let current = $state<PokemonComparisonState | null>(null);

  return {
    get current() {
      return current;
    },
    set(state) {
      current = state;
    },
    clear() {
      current = null;
    },
  };
}

export function getPokemonComparisonStore(): PokemonComparisonStore {
  const store = getContext<PokemonComparisonStore | undefined>(POKEMON_COMPARISON_CONTEXT);

  if (!store) {
    throw new Error("PokemonComparisonStore não foi configurado no layout raiz.");
  }

  return store;
}
