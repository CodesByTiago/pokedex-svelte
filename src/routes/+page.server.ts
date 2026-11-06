import type { PageServerLoad } from "./$types";
import { loadPokemonList } from "#lib/features/pokemon-list/index.server.js";

export const load: PageServerLoad = ({ url }) => loadPokemonList(url);
