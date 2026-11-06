<script lang="ts">
  import { PokemonListView } from "#lib/features/pokemon-list/index.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Pokédex — Explore o mundo Pokémon</title>
  <meta
    name="description"
    content="Explore o catálogo de Pokémon, busque por nome ou número e descubra os detalhes de cada espécie."
  />
</svelte:head>

<PokemonListView
  pokemon={data.pokemon}
  query={data.query}
  page={data.page}
  totalPages={data.totalPages}
  total={data.total}
  compareFirst={data.compareFirst}
  compareSecond={data.compareSecond}
/>
