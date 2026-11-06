# Product Requirements Document (PRD) - Pokédex App

## 1. Visão Geral

O projeto consiste no desenvolvimento de uma aplicação web interativa que simula uma **Pokédex**. O objetivo é permitir que os usuários explorem, busquem e visualizem informações detalhadas sobre diferentes espécies de Pokémon de forma rápida e responsiva.

## 2. Escopo do Produto

### ✅ Dentro do Escopo (MVP)

- Listagem geral de Pokémon.
- Paginação da lista de resultados.
- Busca textual por nome ou ID.
- Filtro avançado (ex: por tipo do Pokémon).
- Página de detalhes de um Pokémon específico (atributos, habilidades, tipos e imagens/sprites).
- Comparação lado a lado entre dois Pokémon.
- Interface responsiva (Mobile-first).

### ❌ Fora do Escopo (Futuro)

- Sistema de Autenticação / Tela de Login (não haverá contas de usuário na v1).
- Sistema de "Favoritos" ou "Capturados".
- Suporte offline nativo completo (PWA avançado).

## 3. Histórias de Usuário (User Stories)

- **US01:** Como usuário, quero ver uma lista paginada de Pokémon na página inicial, para poder explorar o catálogo sem sobrecarregar a aplicação.
- **US02:** Como usuário, quero buscar um Pokémon pelo seu nome ou número da Pokédex, para encontrá-lo rapidamente.
- **US03:** Como usuário, quero filtrar a lista por "Tipos" (ex: Fogo, Água, Grama), para ver apenas os Pokémon daquela categoria.
- **US04:** Como usuário, quero clicar em um Pokémon da lista para abrir uma página de detalhes.
- **US05:** Como usuário, na página de detalhes, quero ver os status base (HP, Attack, Defense, etc.), habilidades e o sprite (imagem) do Pokémon, para conhecer suas características.
- **US06:** Como usuário, quero comparar dois Pokémon lado a lado, para entender as diferenças entre seus atributos, tipos, habilidades e medidas.

## 4. Requisitos Funcionais (RF)

| ID       | Descrição                                                                                                                       | Prioridade |
| :------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------: |
| **RF01** | A tela inicial deve renderizar um grid/lista de cards de Pokémon.                                                               |    Alta    |
| **RF02** | O rodapé (ou topo) da lista deve conter controles de paginação (Próxima/Anterior) ou scroll infinito.                           |    Alta    |
| **RF03** | Deve existir uma barra de busca que atualiza os resultados com base no nome ou ID digitado.                                     |    Alta    |
| **RF04** | Deve existir um controle (dropdown ou chips) para filtrar os Pokémon por seu Tipo.                                              |   Média    |
| **RF05** | Ao selecionar um Pokémon, o sistema deve navegar para a rota de detalhes (ex: `/pokemon/[id]`).                                 |    Alta    |
| **RF06** | A tela de detalhes deve exibir: Nome, Número, Sprites (normal/shiny), Tipos, Habilidades e Status Base.                         |    Alta    |
| **RF07** | A aplicação deve permitir comparar dois Pokémon por nome ou ID, exibindo lado a lado tipos, habilidades, medidas e status base. |   Média    |

## 5. Requisitos Não Funcionais (RNF) e Técnicos

- **RNF01 (Stack):** O projeto deve ser desenvolvido utilizando **Svelte 5** e **SvelteKit**.
- **RNF02 (Arquitetura):** O código deve seguir o padrão **Feature-Sliced Design (FSD)** conforme definido no `architecture.md`.
- **RNF03 (Integração):** O consumo de dados deve ser feito através da API REST oficial referenciada na arquitetura (ex: _PokéAPI_), utilizando a instância configurada do Axios.
- **RNF04 (Desempenho):** A aplicação deve utilizar os recursos de SSR (Server-Side Rendering) do SvelteKit nas páginas de lista, detalhes e comparação para melhorar o SEO e o tempo de carregamento inicial (First Contentful Paint).
- **RNF05 (Responsividade):** A interface deve se adaptar fluidamente desde telas de smartphones (320px) até monitores ultrawide.
- **RNF06 (SEO):** As rotas públicas devem fornecer conteúdo renderizado no servidor, título e descrição próprios e atender ao score mínimo de 90 na auditoria SEO do Lighthouse. O processo de auditoria está documentado em [seo.md](./seo.md).

## 6. Métricas de Sucesso

- A página inicial carrega a primeira leva de Pokémon em menos de 1.5 segundos.
- Navegação fluida entre a lista e a tela de detalhes sem travamentos na interface.
- 100% de cobertura dos componentes críticos mapeados no FSD.
- Score SEO do Lighthouse igual ou superior a 90 nas páginas de catálogo, comparação e detalhes.
