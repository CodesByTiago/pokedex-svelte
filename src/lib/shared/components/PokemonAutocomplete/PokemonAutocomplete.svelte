<script lang="ts">
  import { Search } from "@lucide/svelte";
  import type { PokemonSummary } from "#lib/shared/models/pokemon.js";
  import { debounce } from "#lib/shared/utils/debounce.js";
  import styles from "./PokemonAutocomplete.module.css";

  let {
    id,
    name,
    value = "",
    placeholder,
    class: className = "",
    invalid = false,
    describedBy,
    showSearchIcon = false,
    onSelect,
  }: {
    id: string;
    name: string;
    value?: string;
    placeholder: string;
    class?: string;
    invalid?: boolean;
    describedBy?: string;
    showSearchIcon?: boolean;
    onSelect?: (pokemon: PokemonSummary) => void;
  } = $props();

  let searchValue = $state("");
  let selectedValue = $state("");
  let suggestions = $state<PokemonSummary[]>([]);
  let status = $state<"idle" | "waiting" | "loading" | "empty" | "error">("idle");
  let isOpen = $state(false);
  let hasFocus = $state(false);
  let activeIndex = $state(-1);
  const listboxId = $derived(`${id}-suggestions`);

  $effect(() => {
    searchValue = value;
    selectedValue = "";
  });

  $effect(() => {
    const query = searchValue.trim();

    if ((query.length < 2 && !/^\d+$/.test(query)) || selectedValue === query || !hasFocus) {
      suggestions = [];
      status = "idle";
      isOpen = false;
      activeIndex = -1;
      return;
    }

    suggestions = [];
    status = "waiting";
    isOpen = true;
    activeIndex = -1;

    const controller = new AbortController();
    const cancelDebounce = debounce(() => {
      status = "loading";
      void (async () => {
        try {
          const response = await fetch(
            `/api/pokemon/suggestions?q=${encodeURIComponent(query)}`,
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error("Falha ao carregar sugestões.");

          const result: unknown = await response.json();
          if (!Array.isArray(result) || !result.every(isPokemonSummary)) {
            throw new Error("Resposta inválida de sugestões.");
          }

          suggestions = result;
          status = suggestions.length > 0 ? "idle" : "empty";
        } catch {
          if (controller.signal.aborted) return;
          suggestions = [];
          status = "error";
        }
      })();
    }, 250);

    return () => {
      cancelDebounce();
      controller.abort();
    };
  });

  function selectSuggestion(pokemon: PokemonSummary) {
    if (onSelect) {
      onSelect(pokemon);
      return;
    }

    searchValue = pokemon.name;
    selectedValue = pokemon.name;
    suggestions = [];
    status = "idle";
    isOpen = false;
    activeIndex = -1;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      isOpen = true;
      activeIndex = Math.min(activeIndex + 1, suggestions.length - 1);
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      isOpen = true;
      activeIndex = activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1;
    } else if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      isOpen = false;
      activeIndex = -1;
    }
  }

  function isPokemonSummary(value: unknown): value is PokemonSummary {
    return (
      typeof value === "object" &&
      value !== null &&
      "id" in value &&
      typeof value.id === "number" &&
      "name" in value &&
      typeof value.name === "string" &&
      "image" in value &&
      (typeof value.image === "string" || value.image === null)
    );
  }
</script>

<div class={styles.root}>
  <input
    class={`${styles.input} ${className}`}
    {id}
    {name}
    type="search"
    placeholder={placeholder}
    value={searchValue}
    role="combobox"
    aria-autocomplete="list"
    aria-expanded={isOpen}
    aria-controls={listboxId}
    aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
    aria-invalid={invalid}
    aria-describedby={describedBy}
    class:hasSearchIcon={showSearchIcon}
    autocomplete="off"
    oninput={(event) => {
      selectedValue = "";
      searchValue = event.currentTarget.value;
    }}
    onkeydown={handleKeydown}
    onfocus={() => {
      hasFocus = true;
      if (suggestions.length > 0 || status === "waiting" || status === "loading") isOpen = true;
    }}
    onblur={() => {
      hasFocus = false;
      isOpen = false;
      activeIndex = -1;
    }}
  />
  {#if showSearchIcon}
    <Search class={styles.searchIcon} size={18} aria-hidden="true" />
  {/if}

  {#if isOpen}
    <div class={styles.popover}>
      {#if status === "waiting" || status === "loading"}
        <p class={styles.status} role="status">Buscando sugestões...</p>
      {:else if status === "empty"}
        <p class={styles.status} role="status">Nenhuma sugestão encontrada.</p>
      {:else if status === "error"}
        <p class={styles.status} role="status">Sugestões indisponíveis. Tente novamente.</p>
      {:else if suggestions.length > 0}
        <ul class={styles.listbox} id={listboxId} role="listbox" aria-label="Sugestões de Pokémon">
          {#each suggestions as pokemon, index (pokemon.id)}
            <li>
              <button
                class={styles.option}
                id={`${listboxId}-${index}`}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                onmousedown={(event) => event.preventDefault()}
                onmousemove={() => (activeIndex = index)}
                onclick={() => selectSuggestion(pokemon)}
              >
                {#if pokemon.image}
                  <img class={styles.image} src={pokemon.image} alt="" loading="lazy" />
                {/if}
                <span class={styles.pokemonName}>{pokemon.name}</span>
                <span class={styles.pokemonNumber}>Nº {String(pokemon.id).padStart(4, "0")}</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>
