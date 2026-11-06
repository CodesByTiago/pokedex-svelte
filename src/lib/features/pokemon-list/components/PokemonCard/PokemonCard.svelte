<script lang="ts">
  import type { PokemonSummary } from "#lib/shared/models/pokemon.js";
  import {
    getComparisonHref,
    getPokemonDetailHref,
  } from "#lib/shared/utils/pokemonComparison.js";
  import styles from "./PokemonCard.module.css";

  let {
    pokemon,
    compareFirst,
    compareSecond,
  }: {
    pokemon: PokemonSummary;
    compareFirst: string;
    compareSecond: string;
  } = $props();

  const isSelected = $derived(pokemon.name === compareFirst || pokemon.name === compareSecond);
  const compareLabel = $derived(isSelected
    ? "Ver comparação"
    : compareFirst && !compareSecond
      ? "Adicionar"
      : compareFirst && compareSecond
        ? "Nova comparação"
        : "Comparar");
  const compareActionLabel = $derived(
    compareFirst && !compareSecond && !isSelected
      ? `Adicionar ${pokemon.name} como segundo Pokémon à comparação`
      : compareLabel,
  );
</script>

<article
  class={`${styles.card} ${isSelected ? styles.selected : ""}`}
  aria-current={isSelected ? "true" : undefined}
>
  <a
    class={styles.detailsLink}
    href={getPokemonDetailHref(pokemon.id, compareFirst, compareSecond)}
    aria-label={`Ver detalhes de ${pokemon.name}, número ${pokemon.id}`}
  >
    <div class={styles.imageArea}>
      {#if pokemon.image}
        <img class={styles.image} src={pokemon.image} alt="" loading="lazy" />
      {/if}
      <span class={styles.number}>Nº {String(pokemon.id).padStart(4, "0")}</span>
    </div>
    <div class={styles.content}>
      <h2 class={styles.name}>{pokemon.name}</h2>
      <span class={styles.arrow} aria-hidden="true">→</span>
    </div>
  </a>
  <a
    class={`${styles.compareAction} ${isSelected ? styles.selectedAction : ""}`}
    href={getComparisonHref(compareFirst, compareSecond, pokemon.name)}
    aria-label={compareActionLabel}
  >
    {#if isSelected}
      <span class={styles.addedLabel} aria-hidden="true">Adicionado</span>
      <span class={styles.viewComparisonLabel} aria-hidden="true">Ver comparação</span>
    {:else}
      {compareLabel}
    {/if}
  </a>
</article>
