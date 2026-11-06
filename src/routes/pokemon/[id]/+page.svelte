<script lang="ts">
  import { PokemonDetailView } from "#lib/features/pokemon-detail/index.js";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.pokemon.name} — Pokédex</title>
  <meta
    name="description"
    content={`Veja tipos, habilidades e atributos base de ${data.pokemon.name}.`}
  />
</svelte:head>

<PokemonDetailView
  pokemon={data.pokemon}
  compareFirst={data.compareFirst}
  compareSecond={data.compareSecond}
/>
