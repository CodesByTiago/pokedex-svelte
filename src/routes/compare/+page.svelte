<script lang="ts">
  import { PokemonCompareView } from "#lib/features/pokemon-compare/index.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Compare Pokémon — Pokédex</title>
  <meta
    name="description"
    content="Compare tipos, habilidades, medidas e atributos base de dois Pokémon."
  />
</svelte:head>

<PokemonCompareView
  firstQuery={data.firstQuery}
  secondQuery={data.secondQuery}
  comparison={data.comparison}
  notFound={data.notFound}
  validationMessage={data.validationMessage}
/>
