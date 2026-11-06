# Testes

## Stack

- **Vitest** para testes automatizados.
- **Testing Library** para testar componentes Svelte pelo comportamento observável.
- **MSW (Mock Service Worker)** para interceptar chamadas HTTP sem acessar serviços externos.

O MSW é configurado em `src/lib/core/msw/`: handlers são compartilhados entre navegador e Node, e o setup do Vitest inicia o servidor antes dos testes, restaura os handlers entre eles e fecha o servidor ao final.

## Onde colocar os testes

Mantenha os testes próximos ao código que verificam, respeitando a organização da aplicação:

```text
src/lib/
├── core/
│   └── services/
│       └── logger/
│           ├── logger.ts
│           └── logger.test.ts
├── features/
│   ├── pokemon-list/
│   │   ├── components/
│   │   │   └── PokemonListView/
│   │   │       ├── PokemonListView.svelte
│   │   │       └── PokemonListView.module.css
│   │   ├── tests/
│   │   ├── server.ts
│   │   ├── index.ts
│   │   └── index.server.ts
│   ├── pokemon-detail/
│   │   ├── components/
│   │   ├── tests/
│   │   ├── server.ts
│   │   ├── index.ts
│   │   └── index.server.ts
│   └── pokemon-compare/
│       ├── components/
│       ├── tests/
│       ├── server.ts
│       ├── index.ts
│       └── index.server.ts
└── shared/
    ├── models/
    │   └── pokemon.ts
    ├── repositories/
    │   └── pokemon/
    │       ├── pokemon.ts
    │       └── pokemon.test.ts
    ├── ui/
    │   └── Button/
    │       ├── Button.svelte
    │       └── Button.test.ts
    └── utils/
        ├── formatPokemonName.ts
        └── formatPokemonName.test.ts
```

- Use o sufixo `.test.ts` para testes TypeScript; testes de componentes também podem usar `.test.ts`.
- Cada página é uma feature independente; coloque testes de sua lógica e server loader em `features/<page>/tests/`.
- Coloque modelos compartilhados em `shared/models/` e testes de lógica/requisições reutilizadas por várias páginas junto aos repositórios em `shared/repositories/<domínio>/`.
- Para `core/`, `shared/` e componentes compartilhados, mantenha o teste junto ao módulo ou componente.
- Testes internos de uma feature podem importar seus módulos internos. Fora dela, use `index.ts` para UI/tipos e `index.server.ts` para loaders; nunca importe os arquivos internos de outra feature.

## O que testar

Toda feature nova ou alterada deve ter testes para o comportamento afetado. Priorize cenários relevantes, em vez de testar detalhes de implementação:

1. **Unidade:** regras de domínio, conversões de dados, utilitários e transições de estado.
2. **API da feature:** parâmetros da requisição, transformação da resposta para o tipo de domínio e tratamento de erros.
3. **Componentes:** conteúdo renderizado, interação do usuário, acessibilidade e estados de carregamento, vazio e erro quando aplicáveis.
4. **Integração da feature:** colaboração entre API, estado e componentes por meio da interface pública da feature.
5. **Loaders da página:** teste as regras do loader na própria feature; mantenha `src/routes` como uma camada fina de conexão e composição.

Use nomes de teste que descrevam o resultado esperado. Cubra caminhos de sucesso e falha relevantes; não dependa de detalhes como nomes de variáveis, estrutura interna do componente ou classes CSS.

O autocomplete compartilhado deve ter cobertura para debounce/cancelamento e para sugestões por nome ou número. Use MSW para validar que o índice remoto é carregado uma vez e reutilizado nas consultas seguintes.

## Componentes Svelte

Use Testing Library para renderizar o componente e interagir com ele como uma pessoa usuária. Prefira consultas acessíveis, como `getByRole`, `getByLabelText` e `getByText`; evite selecionar elementos por classes ou pela estrutura privada do DOM.

Verifique resultados visíveis e acessíveis após ações, incluindo props, eventos e estados importantes. Para componentes que usam runes do Svelte 5, teste o comportamento reativo resultante em vez de detalhes internos do estado.

## APIs e mocks

- Não faça chamadas reais à PokéAPI ou a outros serviços durante os testes.
- Use handlers MSW para definir respostas previsíveis, incluindo sucesso, erro HTTP e dados ausentes ou vazios quando esses cenários forem relevantes.
- Registre handlers compartilhados em `src/lib/core/msw/handlers.ts`. Para cenários específicos de um teste, adicione handlers com `server.use(...)`; o setup restaura os handlers originais após cada teste.
- Não substitua a função da feature por um mock ao testar seu contrato HTTP. Intercepte a requisição com MSW para validar método, URL, parâmetros e interpretação da resposta.
- Testes do cliente HTTP devem usar a instância Axios real e handlers MSW, cobrindo respostas de sucesso e erros normalizados como `ApiError`.
- Para código de servidor que dependa de cookies do request, teste o `load` usando o `fetch` injetado pelo SvelteKit; não dependa de uma sessão ou serviço externo.
- No desenvolvimento, os hooks do SvelteKit iniciam o worker no navegador e o servidor Node para requisições SSR. Ambos ignoram requisições sem handler; nos testes, requisições não interceptadas falham para evitar acesso acidental à rede.

O service worker fica em `static/mockServiceWorker.js`. Se a versão do MSW mudar, regenere-o com `pnpm exec msw init static --save`.

## Execução e qualidade

Execute os testes automatizados com `vp test` depois que Vitest estiver configurado. Antes de concluir uma alteração, execute também `vp check` para validar tipos, lint e formatação conforme a configuração do projeto.

Os testes devem ser determinísticos, independentes da ordem de execução e não devem exigir rede, credenciais ou dados persistidos. Corrija a causa de falhas; não ignore testes nem reduza as verificações para fazer a suíte passar.
