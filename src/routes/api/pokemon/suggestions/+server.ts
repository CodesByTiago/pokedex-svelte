import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ApiError } from "#lib/core/api/http.js";
import { getPokemonSuggestions } from "#lib/shared/repositories/pokemon/pokemon.js";

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get("q") ?? "";
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2 && !/^\d+$/.test(normalizedQuery)) return json([]);

  try {
    return json(await getPokemonSuggestions(query));
  } catch (cause) {
    if (cause instanceof ApiError) {
      error(502, "Não foi possível carregar sugestões de Pokémon agora.");
    }

    throw cause;
  }
};
