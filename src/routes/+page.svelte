<script lang="ts">
  import { getPokemonComparisonStore } from "#lib/shared/states/pokemonComparison.svelte.js";
  import { PokemonListView } from "#lib/features/pokemon-list/index.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const comparisonStore = getPokemonComparisonStore();
  const compareFirst = $derived(
    comparisonStore.current?.firstQuery ?? data.compareFirst,
  );
  const compareSecond = $derived(
    comparisonStore.current?.secondQuery ?? data.compareSecond,
  );
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
  {compareFirst}
  {compareSecond}
/>
