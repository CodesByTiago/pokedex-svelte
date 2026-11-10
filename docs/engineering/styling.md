# Estilização

## Stack

- **Tailwind CSS**
- **shadcn-svelte** (componentes base em `src/lib/shared/ui`)
- **CSS Modules** + `@apply` em arquivo separado

Docs:

- Tailwind: https://tailwindcss.com/docs
- shadcn-svelte: https://www.shadcn-svelte.com/docs
- CSS Modules: https://github.com/css-modules/css-modules

## Princípio

O `.svelte` deve conter **markup e lógica**, não listas gigantes de classes utilitárias. Estilos ficam em um arquivo `.module.css` ao lado do componente, usando `@apply`.

## Configuração e tokens

Tailwind CSS 4 é integrado pelo plugin `@tailwindcss/vite`; os estilos globais e tokens ficam em `src/app.css`, importado pelo layout raiz. O shadcn-svelte usa o preset Vega com base neutra, configurado em `components.json`, e gera componentes em `src/lib/shared/ui`, de acordo com a estrutura de `shared/` definida em [architecture.md](./architecture.md).

Os tokens CSS de tema são definidos para os modos claro (`:root`) e escuro (`.dark`) e mapeados para utilities do Tailwind em `@theme inline`. Use classes como `bg-background`, `text-foreground`, `border-border` e `ring-ring` para manter os componentes vinculados ao tema.

Antes de criar controles próprios, verifique se um componente shadcn-svelte já atende ao caso. Use ou envolva os componentes-base compartilhados em `src/lib/shared/ui` (por exemplo, `Input` e `Button`) e deixe na feature somente a composição e o comportamento específicos da página. Se um componente shadcn não atender ao requisito, crie um wrapper/customização sobre ele em vez de duplicar seu controle base.

```
PokeCard/
└── PokeCard/
    ├── PokeCard.svelte
    └── PokeCard.module.css
```

```css
/* ProductCard.module.css */
@reference "../../../app.css"; /* Tailwind v4; omitir em v3 */

.card {
  @apply flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm;
}

.title {
  @apply text-lg font-semibold text-foreground;
}

.price {
  @apply text-sm text-muted-foreground;
}
```

```svelte
<!-- PokeCard.svelte -->
<script lang="ts">
	import styles from './PokeCard.module.css';
	import type { Product } from '../types';

	let { product }: { product: Product } = $props();
</script>

<article class={styles.card}>
	<h3 class={styles.title}>{product.name}</h3>
	<p class={styles.price}>{product.price}</p>
</article>
```

## Regras

1. Classes complexas (mais que ~3-4 utilitários) vão para `.module.css` com `@apply`. Utilitários isolados e triviais (ex.: `sr-only`) podem ficar inline.
2. Nomes de classe em `camelCase` (acesso via `styles.nomeDaClasse`).
3. Não use `<style>` extenso dentro do `.svelte`.
4. Use os tokens do tema (`bg-background`, `text-foreground`, `border`, etc.), nunca cores hardcoded.
5. Variantes/estados: use classes aninhadas no módulo (`.button:hover`, `.button[data-state='open']`) ou `@apply` com modificadores (`hover:bg-accent`); combine classes com `cn()` de `#lib/shared/utils`.
6. Componentes genéricos vêm do shadcn-svelte (`pnpm dlx shadcn-svelte@latest add <componente>`) em `src/lib/shared/ui`. Para customizar, envolva-os ou passe `class` vinda de um módulo, em vez de editar o markup base sem necessidade.
7. Em `features/<page>/components/`, cada componente e seus estilos ficam em uma subpasta própria `PascalCase`; estilos globais e tokens ficam apenas em `src/app.css`.
8. Responsividade e dark mode via modificadores do Tailwind dentro do `@apply` (`md:p-6 dark:bg-muted`).
9. Em `shared/components/`, o nome da pasta continua em `PascalCase`; nomeie o arquivo pelo componente, sem sufixos genéricos (ex.: `shared/components/Header/Header.svelte`). Preserve os nomes e diretórios gerados pelo shadcn-svelte em `shared/ui/`.
