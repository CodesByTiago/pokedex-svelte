import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { getPokemonByNameOrId } from "#lib/shared/repositories/pokemon/pokemon.js";

export async function loadPokemonDetail(id: string, url: URL) {
  if (!/^\d+$/.test(id)) {
    error(404, "Pokémon não encontrado.");
  }

  try {
    return {
      pokemon: await getPokemonByNameOrId(id),
      compareFirst: url.searchParams.get("compareFirst")?.trim().toLowerCase() ?? "",
      compareSecond: url.searchParams.get("compareSecond")?.trim().toLowerCase() ?? "",
    };
  } catch (cause) {
    if (cause instanceof ApiError && cause.status === 404) {
      error(404, "Pokémon não encontrado.");
    }

    if (cause instanceof ApiError) {
      error(502, "Não foi possível carregar os detalhes do Pokémon agora.");
    }

    throw cause;
  }
}
