# Pokédex

Aplicação web responsiva para explorar Pokémon, consultar seus detalhes e comparar duas espécies. Os dados são carregados da [PokéAPI](https://pokeapi.co/docs/v2), e as páginas principais usam renderização no servidor (SSR).

**Preview:** [pokedex-svelte-six.vercel.app](https://pokedex-svelte-six.vercel.app/)

## Funcionalidades

- Catálogo paginado, com 24 Pokémon por página.
- Busca por nome ou número da Pokédex, com sugestões de autocomplete.
- Página de detalhes com tipos, habilidades, altura, peso, atributos base e ilustração shiny quando disponível.
- Comparação lado a lado de dois Pokémon, incluindo tipos, habilidades, medidas e atributos.
- Seleção de Pokémon para comparação a partir do catálogo e da página de detalhes.
- Metadados próprios por página e auditoria SEO com Lighthouse para Mobile e Desktop.
- Layout responsivo, componentes reutilizáveis e tokens de tema claro/escuro.

## Tecnologias

- Svelte 5, SvelteKit e TypeScript.
- Vite+ como toolchain para desenvolvimento, build, verificações e testes.
- Tailwind CSS 4, shadcn-svelte e CSS Modules.
- Axios para chamadas HTTP à PokéAPI.
- Vitest e MSW para testes sem dependência de chamadas reais a serviços externos.
- Lighthouse CI para auditorias SEO locais.

## Requisitos

- Node.js compatível com a toolchain Vite+ configurada no projeto.
- Google Chrome ou Chromium para executar a auditoria Lighthouse.

O projeto declara `pnpm` como package manager. Os comandos abaixo usam o CLI `vp` do Vite+.

## Começando

Instale as dependências e inicie o servidor de desenvolvimento:

```sh
vp install
vp dev
```

O servidor informa a URL local ao iniciar. A aplicação usa `https://pokeapi.co/api/v2` por padrão, sem necessidade de credenciais.

Para sobrescrever a URL da API, crie um arquivo `.env` a partir do exemplo:

```env
PUBLIC_API_URL=https://pokeapi.co/api/v2
```

## Comandos

| Comando        | Descrição                                                                          |
| -------------- | ---------------------------------------------------------------------------------- |
| `vp dev`       | Inicia o servidor de desenvolvimento.                                              |
| `vp build`     | Gera o build de produção.                                                          |
| `vp preview`   | Inicia uma prévia local do build.                                                  |
| `vp run check` | Executa a sincronização do SvelteKit e a verificação de tipos/diagnósticos Svelte. |
| `vp test run`  | Executa os testes automatizados.                                                   |
| `vp run seo`   | Executa o build e as auditorias Lighthouse SEO em Mobile e Desktop.                |

O MSW é ativado em desenvolvimento para interceptar as chamadas configuradas; requisições sem handler continuam sendo encaminhadas à API.

## Rotas

| Rota                       | Conteúdo                                  |
| -------------------------- | ----------------------------------------- |
| `/`                        | Catálogo, busca e paginação.              |
| `/pokemon/[id]`            | Detalhes de um Pokémon.                   |
| `/compare`                 | Seleção e comparação de dois Pokémon.     |
| `/api/pokemon/suggestions` | Endpoint interno usado pelo autocomplete. |

## Arquitetura

As rotas do SvelteKit mantêm a orquestração enxuta; UI e comportamento de cada página ficam em features próprias. Código reutilizado, modelos e acesso compartilhado à PokéAPI ficam em `src/lib/shared`.

```text
src/
├── lib/
│   ├── core/                 # Cliente Axios e configuração do MSW
│   ├── features/
│   │   ├── pokemon-list/     # Catálogo e busca
│   │   ├── pokemon-detail/   # Detalhes
│   │   └── pokemon-compare/  # Comparação
│   └── shared/
│       ├── components/       # Header e autocomplete
│       ├── models/           # Tipos de domínio
│       ├── repositories/     # Acesso compartilhado à PokéAPI
│       ├── ui/               # Componentes base shadcn-svelte
│       └── utils/
├── routes/                   # Páginas e endpoint de sugestões
└── app.css                   # Tailwind e tokens globais do tema
```

Os estilos das features ficam em CSS Modules próximos aos componentes. Veja os documentos para detalhes e convenções:

- [Documentação do produto](./docs/product/)
- [Arquitetura](./docs/engineering/architecture.md)
- [Estilização](./docs/engineering/styling.md)
- [Testes](./docs/engineering/testing.md)
- [SEO e Lighthouse](./docs/engineering/seo.md)

## Auditoria SEO

Execute:

```sh
vp run seo
```

O comando audita `/`, `/compare` e `/pokemon/25` em Mobile e Desktop, exibe as notas SEO e falha caso alguma fique abaixo de 90. Os relatórios JSON e HTML são salvos localmente em `.lighthouseci/` e não são enviados a serviços externos.

Se o Lighthouse não localizar o Chrome/Chromium instalado, defina `CHROME_PATH` com o caminho do executável antes de executar o comando. Mais informações estão em [docs/engineering/seo.md](./docs/engineering/seo.md).

## Build e implantação

Gere e visualize o build de produção localmente:

```sh
vp build
vp preview
```

O projeto usa `adapter-auto`. Antes de implantar, configure o adapter do SvelteKit adequado à plataforma de destino.
