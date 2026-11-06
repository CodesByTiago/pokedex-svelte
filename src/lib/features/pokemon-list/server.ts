import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { getPokemonByNameOrId, getPokemonPage } from "#lib/shared/repositories/pokemon/pokemon.js";

const PAGE_SIZE = 24;

async function loadPokemonPage(offset: number) {
  try {
    return await getPokemonPage(offset, PAGE_SIZE);
  } catch (cause) {
    if (cause instanceof ApiError) {
      error(502, "Não foi possível carregar o catálogo de Pokémon agora.");
    }

    throw cause;
  }
}

export async function loadPokemonList(url: URL) {
  const query = url.searchParams.get("q")?.trim() ?? "";
  const compareFirst = url.searchParams.get("compareFirst")?.trim().toLowerCase() ?? "";
  const compareSecond = url.searchParams.get("compareSecond")?.trim().toLowerCase() ?? "";

  if (query) {
    try {
      const pokemon = await getPokemonByNameOrId(query.toLowerCase());
      return {
        pokemon: [pokemon],
        query,
        page: 1,
        totalPages: 1,
        total: 1,
        compareFirst,
        compareSecond,
      };
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 404) {
        return {
          pokemon: [],
          query,
          page: 1,
          totalPages: 1,
          total: 0,
          compareFirst,
          compareSecond,
        };
      }
      if (cause instanceof ApiError) {
        error(502, "Não foi possível buscar o Pokémon agora.");
      }
      throw cause;
    }
  }

  const requestedPage = Number(url.searchParams.get("page") ?? 1);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const result = await loadPokemonPage((page - 1) * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));
  const lastPage = Math.min(page, totalPages);
  const lastPageResult =
    lastPage === page ? result : await loadPokemonPage((lastPage - 1) * PAGE_SIZE);

  return {
    pokemon: lastPageResult.pokemon,
    query,
    page: lastPage,
    totalPages,
    total: result.total,
    compareFirst,
    compareSecond,
  };
}
