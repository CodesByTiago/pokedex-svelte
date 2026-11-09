import type { PokemonDetails } from "#lib/shared/models/pokemon.js";

export interface PokemonComparisonState {
  firstQuery: string;
  secondQuery: string;
  comparison: [PokemonDetails, PokemonDetails] | null;
  notFound: boolean;
  validationMessage: string;
}

export function resolvePokemonComparisonState(
  loadedState: PokemonComparisonState,
  savedState: PokemonComparisonState | undefined,
  hasQuery: boolean,
): PokemonComparisonState {
  return hasQuery || !savedState ? loadedState : savedState;
}
