<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!--AGENT REFERENCES-->

# Projeto SvelteKit + TypeScript, organizado por features.

## Fluxo de desenvolvimento

Para executar o trabalho em etapas, use as skills em `.agents/skills/`:

| Etapa                                      | Skill               |
| ------------------------------------------ | ------------------- |
| Definir ou refinar requisitos do produto   | `prd-feature`       |
| Implementar comportamento                  | `implement-feature` |
| Criar ou atualizar testes                  | `test-feature`      |
| Implementar ou revisar SEO de rota pública | `seo-feature`       |
| Verificação final, sem alterar arquivos    | `qa-feature`        |

Cada etapa deve consultar somente a documentação indicada pela tarefa e pela skill correspondente. SEO é condicional: use essa etapa quando a mudança afetar uma rota pública ou seus metadados.

## Documentação do projeto

Consulte os documentos pertinentes à tarefa; não é necessário ler todos antes de começar.

| Assunto                                            | Doc                                            |
| -------------------------------------------------- | ---------------------------------------------- |
| Produto, documentação sobre o produto a ser criado | [docs/prd.md](./docs/prd.md)                   |
| Arquitetura, estrutura de pastas, API com Axios    | [docs/architecture.md](./docs/architecture.md) |
| Estilização (Tailwind, shadcn-svelte, CSS Modules) | [docs/styling.md](./docs/styling.md)           |
| Testes (Vitest, MSW, Testing Library)              | [docs/testing.md](./docs/testing.md)           |
| SEO e auditoria Lighthouse                         | [docs/seo.md](./docs/seo.md)                   |

## Regras gerais

- Em caso de dúvida sobre Svelte/SvelteKit, consulte a documentação oficial (links em `docs/architecture.md`) antes de supor comportamento.
- Use Svelte 5 (runes) e TypeScript estrito.
- Cada página deve ter sua própria feature em `src/lib/features`; não agrupe páginas distintas na mesma feature.
- Não coloque lógica de negócio em `src/routes`; a rota delega à API pública da feature correspondente.
- Recursos usados por mais de uma página vivem em `src/lib/shared`; features não importam diretamente umas das outras.
- Toda feature nova ou alterada deve receber testes; use a etapa `test-feature` e consulte `docs/testing.md`.
- Para mudanças de interface, consulte `docs/styling.md` e mantenha os estilos separados conforme os padrões do projeto.

<!--AGENT REFERENCES END-->
