# Arquitetura

## Stack

- **Svelte 5** + **SvelteKit** com TypeScript
- **Axios** para chamadas HTTP
- Organização **baseada em features**

## Documentação oficial (consulte antes de implementar)

- Svelte: https://svelte.dev/docs/svelte
- SvelteKit: https://svelte.dev/docs/kit
- Runes (`$state`, `$derived`, `$effect`, `$props`): https://svelte.dev/docs/svelte/what-are-runes
- Tutorial interativo: https://svelte.dev/tutorial
- Referência para LLMs: https://svelte.dev/llms.txt (versões: `llms-small.txt`, `llms-full.txt`)
- Axios: https://axios-http.com/docs/intro

## Estrutura de Diretórios (Estrutura é apenas exemplo a seguir, não criar esses arquivos)

```
src
├── lib
│   ├── core
│   │   ├── api         # Instância global do Axios
│   │   └── msw         # Interceptação de rede para desenvolvimento e testes
│   ├── features
│   │   └── page-name   # Uma feature corresponde a uma página/rota
│   │       ├── components
│   │       │   └── ComponentName
│   │       │       ├── ComponentName.svelte
│   │       │       └── ComponentName.module.css
│   │       ├── tests
│   │       ├── server.ts
│   │       ├── index.ts        # Componentes e tipos públicos para UI
│   │       └── index.server.ts # API pública exclusiva do servidor (loaders)
│   └── shared
│       ├── models       # Modelos compartilhados entre páginas
│       ├── repositories
│       │   └── pokemon  # Acesso compartilhado à PokéAPI
│       ├── ui           # Design system (shadcn-svelte)
│       ├── components   # Componentes compartilhados (PascalCase, ex: Header/Header.svelte)
│       ├── hooks
│       ├── utils
│       └── states
├── routes # Controllers da aplicação (Orquestração e Loaders)
│   ├── +page.svelte
│   ├── +page.server.ts
│   ├── pokemon/[id]/
│   └── compare/
└── app.d.ts
```

Os aliases do shadcn-svelte devem apontar os componentes e utilitários para `lib/shared/`, mantendo a biblioteca de UI alinhada à estrutura acima.

## Regras

1. **Uma feature por página**: `lib/features/<page>/` concentra UI, comportamento e testes de uma única página/rota. Por exemplo, catálogo e detalhes são features distintas.
2. **`routes/` só conecta**: cada rota delega carregamento de dados à API server-only da feature e compõe seu componente público. Não coloque regras de negócio ou markup complexo na rota.
3. **Limites públicos**: consumidores importam UI e tipos pela `index.ts`; loaders e código que usa APIs exclusivas do servidor são exportados por `index.server.ts`. Não importe arquivos internos de outra feature.
4. **Sem dependência entre features**: funcionalidades reutilizadas por mais de uma página devem ir para `lib/shared/`; modelos ficam em `shared/models/` e acesso a dados em `shared/repositories/<domínio>/`.
5. **`lib/core/`** nunca importa de fora de `lib/core/`.
6. Use o alias `#lib` com a extensão `.js` em imports TypeScript (ex.: `import { PokemonListView } from '#lib/features/pokemon-list/index.js'`).

## Chamadas de API (Axios)

Uma instância única vive em `src/lib/core/api/http.ts` (baseURL via `$app/env/public`, timeout de 10 segundos e normalização de erros Axios). `PUBLIC_API_URL` é definida em `src/env.ts`, com PokéAPI como padrão e possibilidade de sobrescrita por ambiente.

- O acesso a dados compartilhado entre páginas vive em `lib/shared/repositories/<domínio>/`; modelos compartilhados ficam em `lib/shared/models/`. Código específico de uma página permanece na própria feature. Repositórios importam a instância do core, nunca axios diretamente.
- Sugestões de Pokémon são compartilhadas por um endpoint em `routes/api/pokemon/suggestions`; a busca usa o índice da PokéAPI mantido em cache no repositório compartilhado. O componente `shared/components/PokemonAutocomplete` consulta esse endpoint com debounce.
- Funções de acesso a dados retornam dados tipados (por exemplo, `Promise<Type[]>`), não o objeto inteiro do AxiosResponse.
- No servidor (+page.server.ts), caso precise realizar chamadas que dependam de cookies específicos do request (SSR), utilize o fetch nativo injetado pelo SvelteKit na função load.
- O MVP não possui autenticação; adicione um interceptor de autenticação apenas quando esse requisito existir.

```ts
// src/lib/core/api/http.ts
import axios from "axios";
import { PUBLIC_API_URL } from "$app/env/public";

export const http = axios.create({ baseURL: PUBLIC_API_URL, timeout: 10_000 });

// src/lib/shared/repositories/products/getProducts.ts
import { http } from "#lib/core/api/http.js";
import type { Type } from "../../models/types.js";

export const getProducts = async (): Promise<Type[]> => {
  const { data } = await http.get<Type[]>("/api");
  return data;
};
```

## API a ser consumida

A APi a ser consumida será a PokéAPI

Consultar a documentação da API para consumir os dados de form correta.
URL da documentação: https://pokeapi.co/docs/v2

## Convenções

- Componentes: `PascalCase.svelte`. Demais arquivos: `camelCase.ts` ou nomes da estrutura acima.
- Dentro de `features/<page>/components/`, cada componente fica em sua própria subpasta `PascalCase`, junto com os estilos e testes específicos do componente (ex.: `PokemonCard/PokemonCard.svelte`).
- Em `shared/components/`, o nome da pasta continua em `PascalCase` e o arquivo usa o nome do componente sem sufixo genérico (ex.: `Header/Header.svelte`).
- Em `shared/ui/`, preserve a estrutura de nomes gerada pelo shadcn-svelte.
- Exporte pela `index.ts` apenas a API pública de UI/tipos da feature; use `index.server.ts` para loaders e exports exclusivos do servidor.
- Para uma nova página, crie uma feature própria com `components/`, `tests/`, `server.ts`, `index.ts` e, quando houver carregamento server-side, `index.server.ts`. Mantenha modelos compartilhados em `shared/models/` e acesso reutilizado a dados em `shared/repositories/<domínio>/` (ver [testing.md](./testing.md)); estilos conforme [styling.md](./styling.md).
