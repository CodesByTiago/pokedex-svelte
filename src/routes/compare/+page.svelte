<script lang="ts">
  import { untrack } from "svelte";
  import { page } from "$app/state";
  import { replaceState } from "$app/navigation";
  import { PokemonCompareView } from "#lib/features/pokemon-compare/index.js";
  import { resolvePokemonComparisonState } from "#lib/features/pokemon-compare/state.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let comparisonState = $state(untrack(() => data));

  $effect(() => {
    const hasQuery = page.url.searchParams.size > 0;
    comparisonState = resolvePokemonComparisonState(
      data,
      page.state.pokemonComparison,
      hasQuery,
    );

    if (hasQuery) {
      void replaceState(page.url.pathname, {
        ...page.state,
        pokemonComparison: data,
      });
    }
  });
</script>

<svelte:head>
  <title>Compare Pokémon — Pokédex</title>
  <meta
    name="description"
    content="Compare tipos, habilidades, medidas e atributos base de dois Pokémon."
  />
</svelte:head>

<PokemonCompareView
  firstQuery={comparisonState.firstQuery}
  secondQuery={comparisonState.secondQuery}
  comparison={comparisonState.comparison}
  notFound={comparisonState.notFound}
  validationMessage={comparisonState.validationMessage}
/>
