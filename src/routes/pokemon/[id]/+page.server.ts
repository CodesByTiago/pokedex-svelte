import type { PageServerLoad } from "./$types";
import { loadPokemonDetail } from "#lib/features/pokemon-detail/index.server.js";

export const load: PageServerLoad = ({ params, url }) => loadPokemonDetail(params.id, url);
