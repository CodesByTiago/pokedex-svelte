<script lang="ts">
  import Header from "#lib/shared/components/Header/Header.svelte";
  import PokemonAutocomplete from "#lib/shared/components/PokemonAutocomplete/PokemonAutocomplete.svelte";
  import type { PokemonDetails } from "#lib/shared/models/pokemon.js";
  import Button from "#lib/shared/ui/button/Button.svelte";
  import { getPokemonDetailHref } from "#lib/shared/utils/pokemonComparison.js";
  import styles from "./PokemonCompareView.module.css";

  let {
    firstQuery,
    secondQuery,
    comparison,
    notFound,
    validationMessage,
  }: {
    firstQuery: string;
    secondQuery: string;
    comparison: [PokemonDetails, PokemonDetails] | null;
    notFound: boolean;
    validationMessage: string;
  } = $props();

</script>

<main class={styles.page}>
  <Header page="compare" compareFirst={firstQuery} compareSecond={secondQuery} />

  <header class={styles.header}>
    <h1 class={styles.title}>Compare Pokémon</h1>
    <p class={styles.description}>
      Escolha duas espécies para comparar tipos, habilidades, medidas e atributos base.
    </p>
  </header>

  <form class={styles.form} action="/compare" method="GET" novalidate>
    <div class={styles.fields}>
      <div class={styles.field}>
        <div class={styles.labelRow}>
          <label class={styles.label} for="first-pokemon">Primeiro Pokémon</label>
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            name="clear"
            value="first"
            aria-label="Limpar primeiro Pokémon"
          >
            Limpar
          </Button>
        </div>
        <PokemonAutocomplete
          class={styles.input}
          id="first-pokemon"
          name="first"
          placeholder="Nome ou número"
          value={firstQuery}
          invalid={Boolean(validationMessage && !firstQuery)}
          describedBy={validationMessage && !firstQuery ? "compare-validation" : undefined}
        />
      </div>
      <span class={styles.versus} aria-hidden="true">VS</span>
      <div class={styles.field}>
        <div class={styles.labelRow}>
          <label class={styles.label} for="second-pokemon">Segundo Pokémon</label>
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            name="clear"
            value="second"
            aria-label="Limpar segundo Pokémon"
          >
            Limpar
          </Button>
        </div>
        <PokemonAutocomplete
          class={styles.input}
          id="second-pokemon"
          name="second"
          placeholder="Nome ou número"
          value={secondQuery}
          invalid={Boolean(validationMessage && !secondQuery)}
          describedBy={validationMessage && !secondQuery ? "compare-validation" : undefined}
        />
      </div>
    </div>
    <input type="hidden" name="compare" value="true" />
    <div class={styles.formActions}>
      <Button class={styles.submit} type="submit">Comparar</Button>
      <Button
        class={styles.clearAll}
        variant="outline"
        type="submit"
        name="clear"
        value="all"
      >
        Limpar tudo
      </Button>
    </div>
  </form>

  {#if validationMessage}
    <p class={styles.validationMessage} id="compare-validation" role="alert">
      {validationMessage}
    </p>
  {:else if notFound}
    <p class={styles.message} role="alert">
      Não encontramos um ou ambos os Pokémon. Confira os nomes ou números e tente novamente.
    </p>
  {:else if comparison}
    <section class={styles.results} aria-label="Resultado da comparação">
      <div class={styles.pokemonGrid}>
        {#each comparison as pokemon, index (index)}
          <article class={styles.pokemonCard}>
            <a
              class={styles.detailsLink}
              href={getPokemonDetailHref(pokemon.id, firstQuery, secondQuery)}
            >
              <div class={styles.imageArea}>
                {#if pokemon.artwork}
                  <img
                    class={styles.artwork}
                    src={pokemon.artwork}
                    alt=""
                    loading="lazy"
                  />
                {/if}
                <span class={styles.number}>Nº {String(pokemon.id).padStart(4, "0")}</span>
              </div>
              <div class={styles.cardContent}>
                <div class={styles.titleRow}>
                  <h2 class={styles.name}>{pokemon.name}</h2>
                  <span class={styles.arrow} aria-hidden="true">→</span>
                </div>
                <div class={styles.types} aria-label={`Tipos de ${pokemon.name}`}>
                  {#each pokemon.types as type}
                    <span class={styles.type}>{type}</span>
                  {/each}
                </div>
              </div>
            </a>
            <dl class={styles.facts}>
              <div><dt>Altura</dt><dd>{(pokemon.height / 10).toFixed(1)} m</dd></div>
              <div><dt>Peso</dt><dd>{(pokemon.weight / 10).toFixed(1)} kg</dd></div>
              <div>
                <dt>Habilidades</dt>
                <dd>{pokemon.abilities.map((ability) => ability.replaceAll("-", " ")).join(", ")}</dd>
              </div>
            </dl>
          </article>
        {/each}
      </div>

      <section class={styles.statsSection} aria-labelledby="stats-title">
        <h2 class={styles.sectionTitle} id="stats-title">Atributos base</h2>
        <div class={styles.statHeaders}>
          <span class="sr-only">Atributo</span>
          <span>{comparison[0].name}</span>
          <span>{comparison[1].name}</span>
        </div>
        <div class={styles.stats}>
          {#each comparison[0].stats as stat (stat.name)}
            {@const otherStat = comparison[1].stats.find((item) => item.name === stat.name)}
            {@const otherValue = otherStat?.value ?? 0}
            <div class={styles.statRow}>
              <h3 class={styles.statName}>{stat.name.replaceAll("-", " ")}</h3>
              <div class={styles.statValue} data-leading={stat.value > otherValue}>
                {stat.value}
                <span class={styles.track} aria-hidden="true">
                  <span class={styles.bar} style={`width: ${Math.min((stat.value / 255) * 100, 100)}%`}></span>
                </span>
              </div>
              <div class={styles.statValue} data-leading={otherValue > stat.value}>
                {otherValue}
                <span class={styles.track} aria-hidden="true">
                  <span class={styles.bar} style={`width: ${Math.min((otherValue / 255) * 100, 100)}%`}></span>
                </span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </section>
  {:else}
    <p class={styles.message}>Informe dois Pokémon para ver a comparação.</p>
  {/if}
</main>
