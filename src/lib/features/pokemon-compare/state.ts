import type { PokemonDetails } from "#lib/shared/models/pokemon.js";

export interface PokemonComparisonState {
  firstQuery: string;
  secondQuery: string;
  comparison: [PokemonDetails, PokemonDetails] | null;
  notFound: boolean;
  validationMessage: string;
}
