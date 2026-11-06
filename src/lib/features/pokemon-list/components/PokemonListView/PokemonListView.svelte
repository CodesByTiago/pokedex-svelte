<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade, slide } from "svelte/transition";
  import Header from "#lib/shared/components/Header/Header.svelte";
  import PokemonAutocomplete from "#lib/shared/components/PokemonAutocomplete/PokemonAutocomplete.svelte";
  import type { PokemonSummary } from "#lib/shared/models/pokemon.js";
  import {
    getComparisonHref,
    getPokemonDetailHref,
  } from "#lib/shared/utils/pokemonComparison.js";
  import PokemonCard from "../PokemonCard/PokemonCard.svelte";
  import styles from "./PokemonListView.module.css";

  let {
    pokemon,
    query,
    page,
    totalPages,
    total,
    compareFirst,
    compareSecond,
  }: {
    pokemon: PokemonSummary[];
    query: string;
    page: number;
    totalPages: number;
    total: number;
    compareFirst: string;
    compareSecond: string;
  } = $props();

  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (compareFirst) params.set("compareFirst", compareFirst);
    if (compareSecond) params.set("compareSecond", compareSecond);
    params.set("page", String(nextPage));
    return `/?${params.toString()}`;
  };

  const clearComparisonHref = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    else if (page > 1) params.set("page", String(page));
    return `/${params.size ? `?${params}` : ""}`;
  };
</script>

<main class={styles.page}>
  <Header page="catalog" {compareFirst} {compareSecond} />

  <header class={styles.header}>
    <div class={styles.hero}>
      <p class={styles.eyebrow}>Explore o mundo Pokémon</p>
      <h1 class={styles.title}>Encontre seu Pokémon</h1>
      <p class={styles.description}>
        Descubra espécies, conheça suas características e encontre seu próximo favorito.
      </p>
    </div>

    <form class={styles.searchForm} action="/" method="GET" role="search">
      <label class="sr-only" for="pokemon-search">Buscar por nome ou número</label>
      <PokemonAutocomplete
        id="pokemon-search"
        name="q"
        placeholder="Ex.: pikachu ou 25"
        value={query}
        showSearchIcon
        onSelect={(selectedPokemon) =>
          window.location.assign(
            getPokemonDetailHref(selectedPokemon.id, compareFirst, compareSecond),
          )}
      />
      {#if compareFirst}<input type="hidden" name="compareFirst" value={compareFirst} />{/if}
      {#if compareSecond}<input type="hidden" name="compareSecond" value={compareSecond} />{/if}
    </form>
  </header>

  <section aria-labelledby="results-title">
    <div class={styles.resultsHeader}>
      <h2 class={styles.resultsTitle} id="results-title">
        {query ? `Resultado para “${query}”` : "Pokémon"}
      </h2>
      <p class={styles.resultsCount}>
        {query ? `${total} resultado` : `${total.toLocaleString("pt-BR")} espécies`}
      </p>
    </div>

    {#if compareFirst}
      <div
        class={styles.compareStatus}
        aria-live="polite"
        transition:slide={{ duration: 400 }}
      >
        <p>
          Na comparação: <strong>{compareFirst}</strong>
          {#if compareSecond}
            <span> vs <strong>{compareSecond}</strong></span>
          {:else}
            <span> — escolha outro Pokémon</span>
          {/if}
        </p>
        <div class={styles.compareStatusActions}>
          <a
            class={styles.openComparisonLink}
            href={getComparisonHref(compareFirst, compareSecond)}
          >
            Abrir comparação
          </a>
          <a class={styles.clearComparisonLink} href={clearComparisonHref()}>
            Limpar comparação
          </a>
        </div>
      </div>
    {/if}

    {#if pokemon.length > 0}
      <div class={styles.grid}>
        {#each pokemon as item (item.id)}
          <div class={styles.gridItem} animate:flip={{ duration: 180 }} in:fade={{ duration: 180 }}>
            <PokemonCard pokemon={item} {compareFirst} {compareSecond} />
          </div>
        {/each}
      </div>
    {:else}
      <p class={styles.empty}>Nenhum Pokémon encontrado. Confira o nome ou número e tente novamente.</p>
    {/if}

    {#if !query && totalPages > 1}
      <nav class={styles.pagination} aria-label="Paginação do catálogo">
        {#if page > 1}
          <a class={styles.pageLink} href={pageHref(page - 1)}>Anterior</a>
        {:else}
          <span class={styles.pageLink} aria-disabled="true">Anterior</span>
        {/if}
        <span class={styles.pageStatus}>Página {page} de {totalPages}</span>
        {#if page < totalPages}
          <a class={styles.pageLink} href={pageHref(page + 1)}>Próxima</a>
        {:else}
          <span class={styles.pageLink} aria-disabled="true">Próxima</span>
        {/if}
      </nav>
    {/if}
  </section>
</main>
