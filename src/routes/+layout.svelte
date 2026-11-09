<script lang="ts">
	import { setContext } from 'svelte';
	import { createPokemonComparisonStore } from '#lib/shared/states/pokemonComparison.svelte.js';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	setContext('pokemon-comparison', createPokemonComparisonStore());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
