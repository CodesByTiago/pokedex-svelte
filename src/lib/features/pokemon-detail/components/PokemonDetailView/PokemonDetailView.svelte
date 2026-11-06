<script lang="ts">
  import type { PokemonDetails } from "#lib/shared/models/pokemon.js";
  import Header from "#lib/shared/components/Header/Header.svelte";
  import {
    getCatalogHref,
    getComparisonHref,
  } from "#lib/shared/utils/pokemonComparison.js";
  import styles from "./PokemonDetailView.module.css";

  let {
    pokemon,
    compareFirst,
    compareSecond,
  }: {
    pokemon: PokemonDetails;
    compareFirst: string;
    compareSecond: string;
  } = $props();

  const isSelected = $derived(
    pokemon.name === compareFirst || pokemon.name === compareSecond,
  );
  const compareLabel = $derived(
    isSelected
      ? "Ver comparação"
      : compareFirst && !compareSecond
        ? "Adicionar como segundo"
        : compareFirst && compareSecond
          ? "Nova comparação"
          : "Comparar Pokémon",
  );
</script>

<main class={styles.page}>
  <Header page="detail" {compareFirst} {compareSecond} />

  <div class={styles.navigation}>
    <a class={styles.backLink} href={getCatalogHref(compareFirst, compareSecond)}>
      ← Voltar ao catálogo
    </a>
    <a
      class={styles.compareLink}
      href={getComparisonHref(compareFirst, compareSecond, pokemon.name)}
    >
      {compareLabel}
    </a>
  </div>

  <article class={styles.panel}>
    <header class={styles.hero}>
      {#if pokemon.artwork}
        <img class={styles.artwork} src={pokemon.artwork} alt={`Ilustração de ${pokemon.name}`} />
      {/if}

      <div class={styles.heading}>
        <span class={styles.number}>Nº {String(pokemon.id).padStart(4, "0")}</span>
        <h1 class={styles.name}>{pokemon.name}</h1>
        <div class={styles.types} aria-label="Tipos">
          {#each pokemon.types as type}
            <span class={styles.type}>{type}</span>
          {/each}
        </div>
        <div class={styles.measurements}>
          <p class={styles.measurement}>
            Altura
            <span class={styles.measurementValue}>{(pokemon.height / 10).toFixed(1)} m</span>
          </p>
          <p class={styles.measurement}>
            Peso
            <span class={styles.measurementValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
          </p>
        </div>
      </div>
    </header>

    <div class={styles.body}>
      <section aria-labelledby="abilities-title">
        <h2 class={styles.sectionTitle} id="abilities-title">Habilidades</h2>
        <ul class={styles.abilityList}>
          {#each pokemon.abilities as ability}
            <li class={styles.ability}>{ability.replaceAll("-", " ")}</li>
          {/each}
        </ul>
      </section>

      <section aria-labelledby="stats-title">
        <h2 class={styles.sectionTitle} id="stats-title">Atributos base</h2>
        <div class={styles.stats}>
          {#each pokemon.stats as stat}
            <div class={styles.stat}>
              <span class={styles.statName}>{stat.name.replaceAll("-", " ")}</span>
              <span class={styles.statValue}>{stat.value}</span>
              <div
                class={styles.track}
                role="meter"
                aria-label={stat.name.replaceAll("-", " ")}
                aria-valuemin={0}
                aria-valuemax={255}
                aria-valuenow={stat.value}
              >
                <div class={styles.bar} style={`width: ${Math.min((stat.value / 255) * 100, 100)}%`}></div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </div>

    {#if pokemon.shinyArtwork}
      <section class={styles.shiny} aria-labelledby="shiny-title">
        <h2 class={styles.sectionTitle} id="shiny-title">Versão shiny</h2>
        <img class={styles.shinyImage} src={pokemon.shinyArtwork} alt={`${pokemon.name} shiny`} />
      </section>
    {/if}
  </article>
</main>
