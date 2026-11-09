// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { PokemonComparisonState } from "#lib/features/pokemon-compare/state.js";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageState {
      pokemonComparison?: PokemonComparisonState;
    }
    // interface Platform {}
  }
}

export {};
