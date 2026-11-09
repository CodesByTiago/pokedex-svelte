<script lang="ts">
  import { untrack } from "svelte";
  import { afterNavigate, replaceState } from "$app/navigation";
  import { PokemonCompareView } from "#lib/features/pokemon-compare/index.js";
  import { getPokemonComparisonStore } from "#lib/shared/states/pokemonComparison.svelte.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const comparisonStore = getPokemonComparisonStore();
  let comparisonState = $state(untrack(() => data));

  afterNavigate(({ to }) => {
    if (to?.url.searchParams.size) {
      comparisonState = data;
      comparisonStore.set(data);
      void replaceState(to.url.pathname, {});
      return;
    }

    comparisonState = comparisonStore.current ?? data;
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
