<script lang="ts">
  import { slide } from "svelte/transition";
  import {
    getCatalogHref,
    getComparisonHref,
  } from "#lib/shared/utils/pokemonComparison.js";
  import styles from "./Header.module.css";

  let {
    page,
    compareFirst = "",
    compareSecond = "",
  }: {
    page: "catalog" | "compare" | "detail";
    compareFirst?: string;
    compareSecond?: string;
  } = $props();

  const href = $derived(
    page === "compare"
      ? getCatalogHref(compareFirst, compareSecond)
      : getComparisonHref(compareFirst, compareSecond),
  );
  const linkLabel = $derived(page === "compare" ? "Catálogo" : "Comparar Pokémon");
</script>

<nav class={styles.navigation} aria-label="Navegação principal">
  <a class={styles.brand} href={getCatalogHref(compareFirst, compareSecond)}>
    <span class={styles.brandMark} aria-hidden="true">P</span>
    <span class={styles.brandName}>Pokédex</span>
  </a>
  {#if page === "compare" || (page === "catalog" && !compareFirst && !compareSecond)}
    <div transition:slide={{ duration: 400 }}>
      <a class={styles.navigationLink} {href}>{linkLabel}</a>
    </div>
  {/if}
</nav>
