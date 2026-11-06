export interface PokemonComparisonSelection {
  first: string;
  second: string;
}

export function selectPokemonForComparison(
  first: string,
  second: string,
  pokemon: string,
): PokemonComparisonSelection {
  const selection = {
    first: first.trim().toLowerCase(),
    second: second.trim().toLowerCase(),
  };
  const selectedPokemon = pokemon.trim().toLowerCase();

  if (!selection.first) {
    return { first: selectedPokemon, second: "" };
  }

  if (selection.first === selectedPokemon || selection.second === selectedPokemon) {
    return selection;
  }

  if (!selection.second) {
    return { ...selection, second: selectedPokemon };
  }

  return { first: selectedPokemon, second: "" };
}

export function getComparisonHref(first: string, second: string, pokemon?: string): string {
  const selection = pokemon
    ? selectPokemonForComparison(first, second, pokemon)
    : { first: first.trim().toLowerCase(), second: second.trim().toLowerCase() };
  const params = new URLSearchParams();

  if (selection.first) params.set("first", selection.first);
  if (selection.second) params.set("second", selection.second);

  return `/compare${params.size ? `?${params}` : ""}`;
}

export function getCatalogHref(first: string, second: string): string {
  const params = new URLSearchParams();
  if (first) params.set("compareFirst", first);
  if (second) params.set("compareSecond", second);
  return `/${params.size ? `?${params}` : ""}`;
}

export function getPokemonDetailHref(id: number, first: string, second: string): string {
  const params = new URLSearchParams();
  if (first) params.set("compareFirst", first);
  if (second) params.set("compareSecond", second);
  return `/pokemon/${id}${params.size ? `?${params}` : ""}`;
}
