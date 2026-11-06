export interface PokemonSummary {
  id: number;
  name: string;
  image: string | null;
}

export interface PokemonPage {
  pokemon: PokemonSummary[];
  total: number;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetails extends PokemonSummary {
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
  artwork: string | null;
  shinyArtwork: string | null;
}

export interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other: {
      "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
}
