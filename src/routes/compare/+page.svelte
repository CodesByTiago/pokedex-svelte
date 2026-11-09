<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { page } from "$app/state";
  import { replaceState, snapshot } from "$app/navigation";
  import { PokemonCompareView } from "#lib/features/pokemon-compare/index.js";
  import type { PokemonComparisonState } from "#lib/features/pokemon-compare/state.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let comparisonState = $state<PokemonComparisonState>(untrack(() => data));

  snapshot({
    capture: () => comparisonState,
    restore: (state) => {
      comparisonState = state;
    },
  });

  onMount(() => {
    if (page.url.searchParams.size > 0) {
      void replaceState(page.url.pathname, {});
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
