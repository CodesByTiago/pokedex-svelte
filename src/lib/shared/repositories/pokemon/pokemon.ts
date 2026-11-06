import { http } from "#lib/core/api/http.js";
import type {
  PokemonDetails,
  PokemonPage,
  PokemonListResponse,
  PokemonResponse,
  PokemonSummary,
} from "../../models/pokemon.js";

const OFFICIAL_ARTWORK_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const SUGGESTION_LIMIT = 8;
const POKEMON_INDEX_TTL = 60 * 60 * 1000;

let pokemonIndexCache: { entries: PokemonSummary[]; expiresAt: number } | undefined;
let pokemonIndexRequest: Promise<PokemonSummary[]> | undefined;

function toSummary(pokemon: PokemonResponse): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other["official-artwork"]?.front_default ?? pokemon.sprites.front_default,
  };
}

function toSummaryFromList(name: string, url: string): PokemonSummary {
  const id = Number(url.match(/\/pokemon\/(\d+)\/?$/)?.[1]);

  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`URL inválida para o Pokémon "${name}".`);
  }

  return {
    id,
    name,
    image: `${OFFICIAL_ARTWORK_URL}/${id}.png`,
  };
}

async function loadPokemonIndex(): Promise<PokemonSummary[]> {
  const { data: metadata } = await http.get<PokemonListResponse>("/pokemon", {
    params: { limit: 1 },
  });

  if (metadata.count < 1) return [];

  const { data } = await http.get<PokemonListResponse>("/pokemon", {
    params: { limit: metadata.count },
  });

  return data.results.map(({ name, url }) => toSummaryFromList(name, url));
}

async function getPokemonIndex(): Promise<PokemonSummary[]> {
  if (pokemonIndexCache && pokemonIndexCache.expiresAt > Date.now()) {
    return pokemonIndexCache.entries;
  }

  const request = (pokemonIndexRequest ??= loadPokemonIndex());

  try {
    const entries = await request;
    pokemonIndexCache = { entries, expiresAt: Date.now() + POKEMON_INDEX_TTL };
    return entries;
  } finally {
    if (pokemonIndexRequest === request) pokemonIndexRequest = undefined;
  }
}

export async function getPokemonPage(offset: number, limit: number): Promise<PokemonPage> {
  const { data } = await http.get<PokemonListResponse>("/pokemon", {
    params: { offset, limit },
  });

  return {
    total: data.count,
    pokemon: data.results.map(({ name, url }) => toSummaryFromList(name, url)),
  };
}

export async function getPokemonSuggestions(query: string): Promise<PokemonSummary[]> {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length < 2 && !/^\d+$/.test(normalizedQuery)) return [];

  const entries = await getPokemonIndex();

  return entries
    .map((pokemon) => {
      const id = String(pokemon.id);
      const rank =
        pokemon.name === normalizedQuery || id === normalizedQuery
          ? 0
          : pokemon.name.startsWith(normalizedQuery) || id.startsWith(normalizedQuery)
            ? 1
            : pokemon.name.includes(normalizedQuery)
              ? 2
              : -1;

      return { pokemon, rank };
    })
    .filter(({ rank }) => rank >= 0)
    .sort((first, second) => first.rank - second.rank || first.pokemon.id - second.pokemon.id)
    .slice(0, SUGGESTION_LIMIT)
    .map(({ pokemon }) => pokemon);
}

export async function getPokemonByNameOrId(query: string): Promise<PokemonDetails> {
  const { data } = await http.get<PokemonResponse>(`/pokemon/${encodeURIComponent(query)}`);
  const summary = toSummary(data);
  const officialArtwork = data.sprites.other["official-artwork"];

  return {
    ...summary,
    height: data.height,
    weight: data.weight,
    types: data.types.map(({ type }) => type.name),
    abilities: data.abilities.map(({ ability }) => ability.name),
    stats: data.stats.map(({ base_stat, stat }) => ({
      name: stat.name,
      value: base_stat,
    })),
    artwork: officialArtwork?.front_default ?? summary.image,
    shinyArtwork: officialArtwork?.front_shiny ?? data.sprites.front_shiny,
  };
}
