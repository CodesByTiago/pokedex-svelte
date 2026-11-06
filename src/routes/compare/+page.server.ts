import type { PageServerLoad } from "./$types";
import { loadPokemonComparison } from "#lib/features/pokemon-compare/index.server.js";

export const load: PageServerLoad = ({ url }) => loadPokemonComparison(url);
