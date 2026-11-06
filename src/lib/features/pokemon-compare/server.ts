import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { getPokemonByNameOrId } from "#lib/shared/repositories/pokemon/pokemon.js";

export async function loadPokemonComparison(url: URL) {
  let firstQuery = url.searchParams.get("first")?.trim().toLowerCase() ?? "";
  let secondQuery = url.searchParams.get("second")?.trim().toLowerCase() ?? "";
  const clearSlot = url.searchParams.get("clear");

  if (clearSlot === "first") firstQuery = "";
  if (clearSlot === "second") secondQuery = "";
  if (clearSlot === "all") {
    firstQuery = "";
    secondQuery = "";
  }

  if (clearSlot === "first" || clearSlot === "second" || clearSlot === "all") {
    return {
      firstQuery,
      secondQuery,
      comparison: null,
      notFound: false,
      validationMessage: "",
    };
  }

  const validationMessage =
    url.searchParams.has("compare") && (!firstQuery || !secondQuery)
      ? "Preencha os dois campos para comparar os Pokémon."
      : "";

  if (!firstQuery || !secondQuery) {
    return { firstQuery, secondQuery, comparison: null, notFound: false, validationMessage };
  }

  try {
    const comparison = await Promise.all([
      getPokemonByNameOrId(firstQuery),
      getPokemonByNameOrId(secondQuery),
    ]);

    return { firstQuery, secondQuery, comparison, notFound: false, validationMessage: "" };
  } catch (cause) {
    if (cause instanceof ApiError && cause.status === 404) {
      return {
        firstQuery,
        secondQuery,
        comparison: null,
        notFound: true,
        validationMessage: "",
      };
    }

    if (cause instanceof ApiError) {
      error(502, "Não foi possível comparar os Pokémon agora.");
    }

    throw cause;
  }
}
